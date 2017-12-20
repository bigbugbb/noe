import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { StorageService } from '@app/core/storage/storage.service';
import { environment } from '@env/environment';
import { Message, Thread } from '@app/models';
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
  public populateThreads: Subject<Thread[]> = new Subject<Thread[]>();

  // action streams for message
  public populateMessagesOfThread: Subject<any> = new Subject<any>();

  // action streams for socket.io
  public messageAdded: Subject<Message> = new Subject<Message>();
  public threadUpdated: Subject<Thread> = new Subject<Thread>();

  // observables
  public openedThreads: Observable<Thread[]>;
  public messagesNotRead: Observable<Number>;

  constructor(
    private threadService: ThreadService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
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
          return threads.map((thread: Thread) => {
            if (thread._id === accessing._id) {
              thread.opened = true;
              thread.messagesNotRead = 0;
            }
            return thread;
          });
        };
      })
      .subscribe(this.threadsUpdates);

    this.closeThread
      .map(updateThreadRemote)
      .map((closing: Thread): IThreadsOperation => {
        return (threads: Thread[]) => {
          return threads.map((thread: Thread) => {
            if (thread._id === closing._id) {
              thread.opened = false;
              thread.messagesNotRead = 0;
            }
            return thread;
          });
        };
      })
      .subscribe(this.threadsUpdates);

    this.updateThread
      .map(function(updating: Thread): IThreadsOperation {
        return (threads: Thread[]) => {
          return threads.map((thread: Thread) => {
            if (thread._id === updating._id) {
              _.assign(thread, updating);
            }
            return thread;
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

    // prepare data
    this.fetchRemoteThreads();
  }

  fetchRemoteThreads() {
    this.threadService.getAll()
      .subscribe(result => {
        this.populateThreads.next(result.threads);
      });
  }

  fetchRemoteMessagesOfThread(threadId: string, limit: number = 30, lastTime: number = _.now()) {
    this.messageService.getAll(threadId, { limit, lastTime })
      .subscribe(result => {
        const messagesOfThread = result.messages;
        this.populateMessagesOfThread.next({ threadId, messagesOfThread });
      });
  }

  messagesOfThread(threadId): Observable<Message[]> {
    return this.messagesOfThreads
      .map(messagesOfThreads => messagesOfThreads[threadId])
      .distinctUntilChanged();
  }

  connect() {
    this.socket = io(this.url);

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

    this.socket.on('message-added', (message) => {
      this.messageAdded.next(message);
    });

    this.socket.on('thread-updated', (thread) => {
      this.threadUpdated.next(thread);
    });
  }

  join(room?) {
    const user = this.storageService.getUser();
    this.socket.emit('join', user._id, _.isEmpty(room) ? user._id : room);
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(room, author, target, text) {
    const token = this.storageService.getToken();
    this.socket.emit('add-message', room, token, author, target, text);
  }
}
