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

type MessagesOfThreads = {[key: string]: Message[]};
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
  public threads$: Observable<Thread[]>;

  // `messagesOfThreads` is a stream that emits an array of the most up to date messages of threads
  public messagesOfThreads$: Observable<MessagesOfThreads>;

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
  public prependThread: Subject<Thread> = new Subject<Thread>();
  public populateThreads: Subject<Thread[]> = new Subject<Thread[]>();
  public increaseMessagesNotRead: Subject<Thread> = new Subject<Thread>();

  // action streams for message
  public appendMessage: Subject<Message> = new Subject<Message>();
  public populateMoTs: Subject<any> = new Subject<any>();

  // observables
  public openedThreads$: Observable<Thread[]>;
  public messagesNotRead$: Observable<Number>;

  constructor(
    private threadService: ThreadService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
    this.user = this.storageService.getUser();

    const isSameThread = (t1: Thread, t2: Thread): boolean => {
      return t1.author.id === t2.author.id && t1.target.id === t2.target.id;
    };

    const keyOfMoT = (thread: Thread) => {
      return `${thread.author.id}-${thread.target.id}`;
    };

    const updateRemoteThread = (thread: Thread) => {
      const { _id, lastMessage } = thread;
      if (!_.isEmpty(_id)) {
        this.threadService.update(_id, lastMessage)
          .subscribe(data => {
            this.updateThread.next(data.thread);
          });
      }
      return thread;
    };

    const fetchRemoteThreads = () => {
      this.threadService.getAll()
        .subscribe(result => this.populateThreads.next(result.threads));
    };

    const fetchRemoteMessagesOfThread = (thread: Thread, limit: number = 999, lastTime: number = _.now()) => {
      const threadId = thread._id;
      if (!_.isEmpty(threadId)) {
        this.messageService.getAll(threadId, { limit, lastTime })
          .subscribe(result => {
            const key = keyOfMoT(thread);
            const mot: Message[] = result.messages;
            this.populateMoTs.next({ key, mot });
          });
      }
    };

    /**
     * `threads` stream related stuff
     */
    this.threads$ = this.threadsUpdates
      // watch the updates and accumulate operations on the threads
      .scan((threads: Thread[], operation: IThreadsOperation) => operation(threads), initialThreads)
      // make sure we can share the most recent list of threads across anyone
      // who's interested in subscribing and cache the last known list of threads
      .publishReplay(1)
      .refCount();

    this.prependThread
      .map((prepending: Thread): IThreadsOperation => {
        return (threads: Thread[]) => {
          const thread = _.find(threads, (t) => isSameThread(t, prepending));
          return thread ? threads : [prepending, ...threads];
        };
      })
      .subscribe(this.threadsUpdates);

    this.populateThreads
      .map((threadsToPopulate: Thread[]): IThreadsOperation => {
        return (threads: Thread[]) => _.concat(threads, threadsToPopulate);
      })
      .subscribe(this.threadsUpdates);

    this.accessThread
      .map(updateRemoteThread)
      .map((accessing: Thread): IThreadsOperation => {
        fetchRemoteMessagesOfThread(accessing);
        return (threads: Thread[]) => {
          _.remove(threads, (t) => isSameThread(t, accessing));
          accessing.opened = true;
          accessing.messagesNotRead = 0;
          threads.unshift(accessing);
          return threads;
        };
      })
      .subscribe(this.threadsUpdates);

    this.updateThread
      .map((updating: Thread): IThreadsOperation => {
        return (threads: Thread[]) => threads.map((t: Thread) => {
          if (isSameThread(t, updating)) {
            _.assign(t, updating);
          }
          return t;
        });
      })
      .subscribe(this.threadsUpdates);

    this.closeThread
      .map(updateRemoteThread)
      .map((closing: Thread): IThreadsOperation => {
        return (threads: Thread[]) => threads.map((t: Thread) => {
          if (isSameThread(t, closing)) {
            t.opened = false;
            t.messagesNotRead = 0;
          }
          return t;
        });
      })
      .subscribe(this.threadsUpdates);

    this.increaseMessagesNotRead
      .map((increasing: Thread): IThreadsOperation => {
        return (threads: Thread[]) => {
          const thread = _.find(threads, (t) => isSameThread(t, increasing));
          if (!thread.opened) {
            if (!thread.messagesNotRead) { thread.messagesNotRead = 0; }
            thread.messagesNotRead++;
          }
          return threads;
        };
      })
      .subscribe(this.threadsUpdates);

    this.messagesNotRead$ = this.threads$
      .map((threads: Thread[]) => _.chain(threads)
        .map(thread => thread.messagesNotRead)
        .reduce(_.add)
        .value()
      );

    this.openedThreads$ = this.threads$
      .map((threads: Thread[]) => _.filter(threads, 'opened'));

    /**
     * `messagesOfThreads` stream related stuff
     */
    this.messagesOfThreads$ = this.messagesUpdates
      .scan((mots: MessagesOfThreads, operation: IMessagesOperation) => operation(mots), initialMessages)
      .publishReplay(1)
      .refCount();

    this.populateMoTs
      .map(({ key, mot }): IMessagesOperation => {
        return (mots: MessagesOfThreads) => <MessagesOfThreads>_.set(mots, key, mot);
      })
      .subscribe(this.messagesUpdates);

    this.appendMessage
      .map((message): IMessagesOperation => {
        return (mots: MessagesOfThreads) => {
          const key = keyOfMoT(message.thread);
          const mot = _.get(mots, key) as Message[];
          if (_.isEmpty(mot)) {
            _.set(mots, key, [ message ]);
          } else {
            const sync = _.findLast(
              mot, (m: Message) => _.isEmpty(m._id) && m.uuid === message.uuid
            );
            _.isEmpty(sync) ? mot.push(message) : _.assign(sync, message);
          }
          return mots;
        };
      })
      .subscribe(this.messagesUpdates);

    // prepare data
    fetchRemoteThreads();
  }

  messagesOfThread(thread: Thread): Observable<Message[]> {
    const key = `${thread.author.id}-${thread.target.id}`;
    return this.messagesOfThreads$
      .map(mots => mots[key])
      .distinctUntilChanged();
  }

  createLocalThread(author: Jabber, target: Jabber): Thread {
    const thread = new Thread(author, target);
    this.prependThread.next(thread);
    return thread;
  }

  sendMessage(message: Message) {
    const { author, target, text, uuid } = message;

    // The message sent was created locally and will be appended to the cache.
    this.appendMessage.next(message);

    // send the message and wait for 'message-added' event to update the local one
    const token = this.storageService.getToken();
    this.socket.emit('add-message', token, author, target, text, uuid);
  }

  connect() {
    this.socket = io(this.url);

    this.socket.on('message-added', (message) => {
      this.appendMessage.next(message);
      this.increaseMessagesNotRead.next(message.thread);
    });

    this.socket.on('thread-created', (thread) => {
      if (thread.author.id === this.user._id) {
        this.updateThread.next(thread);
      } else {
        this.prependThread.next(thread);
      }
    });

    this.socket.on('thread-updated', (thread) => {
      this.updateThread.next(thread);
    });

    this.socket.on('connect', () => {
      setTimeout(() => this.join(this.user._id), 0);
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
