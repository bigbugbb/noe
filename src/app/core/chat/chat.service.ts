import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { StorageService } from '@app/core/storage/storage.service';
import { environment } from '@env/environment';
import { setTimeout } from 'timers';

@Injectable()
export class ChatService {
  private url = environment.chatServerEndpoint + '/contact';
  private socket;

  constructor(
    private storageService: StorageService
  ) {}

  connect() {
    this.socket = io(this.url);
    this.join();
  }

  join(room?) {
    const user = this.storageService.getUser();
    this.socket.emit('join', user._id, _.isEmpty(room) ? user._id : room);
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(from, to, message) {
    this.socket.emit('message', from, to, message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('message', (from, message) => {
        observer.next(message);
      });
    });
    return observable;
  }
}
