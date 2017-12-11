import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { StorageService } from '@app/core/storage/storage.service';
import { environment } from '@env/environment';
import { Message, Thread } from '@app/models';
import { setTimeout } from 'timers';

@Injectable()
export class ChatService {
  private url = environment.chatServerEndpoint + '/contact';
  private socket;

  public messageAdded = new Subject<Message>();
  public threadUpdated = new Subject<Thread>();

  constructor(
    private storageService: StorageService
  ) {}

  connect() {
    this.socket = io(this.url);
    this.join();

    this.socket.on('message-added', (message) => {
      this.messageAdded.next(message);
    });

    this.socket.on('thread-updated', (thread) => {
      this.threadUpdated.next(thread);
    });

    this.socket.on('error', () => {
      console.log('some error');
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
