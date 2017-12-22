import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { StorageService } from '@app/core/storage/storage.service';
import { environment } from '@env/environment';
import { Message, Thread, Jabber, User } from '@app/models';
import { ThreadService } from '../api/thread/thread.service';
import { MessageService } from '../api/message/message.service';
import { setTimeout } from 'timers';

type MessagesOfThreads = {[threadId: string]: Message[]};
type IThreadsOperation = (threads: Thread[]) => Thread[];
type IMessagesOperation = (messages: MessagesOfThreads) => MessagesOfThreads;

const initialThreads: Thread[] = [];
const initialMessages: MessagesOfThreads = {};

@Injectable()
export class ChatService {
  private url = environment.chatServerEndpoint + '/contact';
  public socket;

  public user: User;

  // `threads` is a stream that emits an array of the most up to date threads
  public threads: Observable<Thread[]>;

  // `messagesOfThreads` is a stream that emits an array of the most up to date messages of threads
  public messagesOfThreads: Observable<MessagesOfThreads>;

  // `threadsUpdates` receives _operations_ to be applied to our `threads`
  // it's a way we can perform changes on *all* threads (that are currently
  // stored in `threads`)
  private threadsUpdates: Subject<any> = new Subject<any>();

  // `messagesUpdates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  private messagesUpdates: Subject<any> = new Subject<any>();

  // action streams for thread
  public accessThread: Subject<Thread> = new Subject<Thread>();
  public closeThread: Subject<Thread> = new Subject<Thread>();
  public updateThread: Subject<Thread> = new Subject<Thread>();
  public preappendThread: Subject<Thread> = new Subject<Thread>();
  public populateThreads: Subject<Thread[]> = new Subject<Thread[]>();

  // action streams for message
  public appendMessage: Subject<Message> = new Subject<Message>();
  public syncMessage: Subject<Message> = new Subject<Message>();
  public populateMessagesOfThread: Subject<any> = new Subject<any>();
  public updateKeyForMessagesOfThread: Subject<any> = new Subject<any>();

  // observables
  public openedThreads: Observable<Thread[]>;
  public messagesNotRead: Observable<Number>;

  constructor(
    private threadService: ThreadService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
    this.user = this.storageService.getUser();

    /**
     * `threads` stream related stuff
     */
    this.threads = this.threadsUpdates
      // watch the updates and accumulate operations on the threads
      .scan((threads: Thread[], operation: IThreadsOperation) => {
        return operation(threads);
      }, initialThreads)
      // make sure we can share the most recent list of threads across anyone
      // who's interested in subscribing and cache the last known list of threads
      .publishReplay(1)
      .refCount();

    const isSameThread = function (t1: Thread, t2: Thread): boolean {
      return t1.author.id === t2.author.id && t1.target.id === t2.target.id;
    };

    this.preappendThread
      .map(function(threadToPreappend: Thread): IThreadsOperation {
        return (threads: Thread[]) => {
          const thread = _.find(threads, (t) => isSameThread(t, threadToPreappend));
          if (!_.isEmpty(thread)) {
            _.assign(thread, threadToPreappend);
            return threads;
          }
          return [threadToPreappend, ...threads];
        };
      })
      .subscribe(this.threadsUpdates);

    this.populateThreads
      .map(function(threadsToPopulate: Thread[]): IThreadsOperation {
        return (threads: Thread[]) => {
          return _.concat(threads, threadsToPopulate);
        };
      })
      .subscribe(this.threadsUpdates);

    const updateThreadRemote = (thread) => {
      const { _id, lastMessage } = thread;
      this.threadService.update(_id, lastMessage)
        .subscribe(data => this.updateThread.next(data.thread));
      return thread;
    };

    this.accessThread
      .map(updateThreadRemote)
      .map((accessing: Thread): IThreadsOperation => {
        this.fetchRemoteMessagesOfThread(accessing._id);
        return (threads: Thread[]) => {
          return threads.map((t: Thread) => {
            if (isSameThread(t, accessing)) {
              t.opened = true;
              t.messagesNotRead = 0;
            }
            return t;
          });
        };
      })
      .subscribe(this.threadsUpdates);

    this.updateThread
      .map(function(updating: Thread): IThreadsOperation {
        return (threads: Thread[]) => {
          return threads.map((t: Thread) => {
            if (isSameThread(t, updating)) {
              _.assign(t, updating);
            }
            return t;
          });
        };
      })
      .subscribe(this.threadsUpdates);

    this.closeThread
      .map(updateThreadRemote)
      .map((closing: Thread): IThreadsOperation => {
        return (threads: Thread[]) => {
          return threads.map((t: Thread) => {
            if (isSameThread(t, closing)) {
              t.opened = false;
              t.messagesNotRead = 0;
            }
            return t;
          });
        };
      })
      .subscribe(this.threadsUpdates);

    this.messagesNotRead = this.threads
      .map((threads: Thread[]) => {
        return _.chain(threads)
          .map(thread => thread.messagesNotRead)
          .reduce(_.add)
          .value();
      });

    this.openedThreads = this.threads
      .map((threads: Thread[]) => _.filter(threads, 'opened'));

    /**
     * `messagesOfThreads` stream related stuff
     */
    this.messagesOfThreads = this.messagesUpdates
      .scan((messagesOfThreads: MessagesOfThreads, operation: IMessagesOperation) => {
        return operation(messagesOfThreads);
      }, initialMessages)
      .publishReplay(1)
      .refCount();

    this.populateMessagesOfThread
      .map(function({ threadId, messagesOfThread }): IMessagesOperation {
        return (messagesOfThreads: MessagesOfThreads) => {
          return _.set(messagesOfThreads, `${threadId}`, messagesOfThread) as MessagesOfThreads;
        };
      })
      .subscribe(this.messagesUpdates);

    this.updateKeyForMessagesOfThread
      .map(function(thread: Thread): IMessagesOperation {
        return (messagesOfThreads: MessagesOfThreads) => {
          const newKey = thread._id;
          const oldKey = `${thread.author.id}-${thread.target.id}`;
          const messages = _.get(messagesOfThreads, oldKey);
          messagesOfThreads = _.omit(messagesOfThreads, [oldKey]) as MessagesOfThreads;
          return _.set(messagesOfThreads, newKey, messages) as MessagesOfThreads;
        };
      })
      .subscribe(this.messagesUpdates);

    this.appendMessage
      .map(function(message): IMessagesOperation {
        const threadId = message.thread;
        return (messagesOfThreads: MessagesOfThreads) => {
          const messagesOfThread = _.get(messagesOfThreads, `${threadId}`) as Message[];
          if (_.isEmpty(messagesOfThread)) {
            _.set(messagesOfThreads, `${threadId}`, [ message ]);
          } else {
            messagesOfThread.push(message);
          }
          return messagesOfThreads;
        };
      })
      .subscribe(this.messagesUpdates);

    this.syncMessage
      .map(function(message: Message): IMessagesOperation {
        const threadId = message.thread;
        return (messagesOfThreads: MessagesOfThreads) => {
          const messagesOfThread = _.get(messagesOfThreads, `${threadId}`) as Message[];
          if (!_.isEmpty(messagesOfThread)) {
            const messageToSync = _.findLast(messagesOfThread, (m: Message) => {
              return _.isEmpty(m._id) && m.uuid === message.uuid;
            });
            _.isEmpty(messageToSync) ?
              messagesOfThread.push(message) : _.assign(messageToSync, message);
          }
          return messagesOfThreads;
        };
      })
      .subscribe(this.messagesUpdates);

    // prepare data
    this.fetchRemoteThreads();
  }

  fetchRemoteThreads() {
    this.threadService.getAll()
      .subscribe(result => {
        this.populateThreads.next(result.threads);
      });
  }

  fetchRemoteMessagesOfThread(threadId: string, limit: number = 999, lastTime: number = _.now()) {
    this.messageService.getAll(threadId, { limit, lastTime })
      .subscribe(result => {
        const messagesOfThread: Message[] = result.messages;
        this.populateMessagesOfThread.next({ threadId, messagesOfThread });
      });
  }

  messagesOfThread(threadId): Observable<Message[]> {
    return this.messagesOfThreads
      .map(messagesOfThreads => messagesOfThreads[threadId])
      .distinctUntilChanged();
  }

  createLocalThread(author: Jabber, target: Jabber): Thread {
    const thread = new Thread(`${author.id}-${target.id}`, author, target);
    this.preappendThread.next(thread);
    return thread;
  }

  sendMessage(room: string, message: Message) {
    const { author, target, text, uuid } = message;

    // The message sent was created locally and will be appended to the cache.
    // Wait for 'message-added' event to update the message properties.
    this.appendMessage.next(message);

    // send the message and wait for 'message-added' event to update the local one
    const token = this.storageService.getToken();
    this.socket.emit('add-message', room, token, author, target, text, uuid);
  }

  connect() {
    this.socket = io(this.url);

    this.socket.on('message-added', (message) => {
      this.syncMessage.next(message);
    });

    this.socket.on('thread-created', (thread) => {
      this.updateThread.next(thread);
      this.updateKeyForMessagesOfThread.next(thread);
    });

    this.socket.on('thread-updated', (thread) => {
      this.updateThread.next(thread);
    });

    this.socket.on('connect', () => {
      setTimeout(() => this.join(), 0);
      console.log('connect');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });

    this.socket.on('connect_error', (error) => {
      console.log(`connect_error ${error}`);
    });

    this.socket.on('connect_timeout', (timeout) => {
      console.log('connect_timeout');
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`reconnect ${attemptNumber} times`);
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`reconnect_attempt ${attemptNumber} times`);
    });

    this.socket.on('reconnecting', (attemptNumber) => {
      console.log(`reconnecting ${attemptNumber} times`);
    });

    this.socket.on('reconnect_error', (error) => {
      console.log(`reconnect_error ${error}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('reconnect_failed');
    });

    this.socket.on('error', (error) => {
      console.log(`error ${error}`);
    });

    this.socket.on('ping', () => {
      console.log('ping');
    });

    this.socket.on('pong', (latency) => {
      console.log(`pong ${latency}`);
    });
  }

  join(room?) {
    const userId = this.user._id;
    this.socket.emit('join', userId, _.isEmpty(room) ? userId : room);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
