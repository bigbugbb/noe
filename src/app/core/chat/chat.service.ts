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

const initialThreads: Thread[] = [];

type IThreadsOperation = (threads: Thread[]) => Thread[];

@Injectable()
export class ChatService {
  private url = environment.chatServerEndpoint + '/contact';
  public socket;

  // `threads` is a stream that emits an array of the most up to date threads
  public threads: Observable<Thread[]>;

  public openedThreads: Observable<Thread[]>;
  public messagesNotRead: Observable<Number>;

  public messageAdded = new Subject<Message>();
  public threadUpdated = new Subject<Thread>();

  // `threadsUpdates` receives _operations_ to be applied to our `threads`
  // it's a way we can perform changes on *all* threads (that are currently
  // stored in `threads`)
  public threadsUpdates: Subject<any> = new Subject<any>();

  // action streams
  public accessThread: Subject<Thread> = new Subject<Thread>();
  public closeThread: Subject<Thread> = new Subject<Thread>();
  public updateThread: Subject<Thread> = new Subject<Thread>();
  public populateLocalThreads: Subject<Thread[]> = new Subject<Thread[]>();

  constructor(
    private threadService: ThreadService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
    this.threads = this.threadsUpdates
      // watch the updates and accumulate operations on the threads
      .scan((threads: Thread[], operation: IThreadsOperation) => {
        return operation(threads);
      }, initialThreads)
      // make sure we can share the most recent list of threads across anyone
      // who's interested in subscribing and cache the last known list of threads
      .publishReplay(1)
      .refCount();

    this.populateLocalThreads
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

    this.threadService.getAll().subscribe(result => {
      const threads: Thread[] = result.threads;
      this.populateLocalThreads.next(threads);
    });
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
