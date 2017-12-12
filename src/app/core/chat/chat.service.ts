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
  public socket;

  public messageAdded = new Subject<Message>();
  public threadUpdated = new Subject<Thread>();

  constructor(
    private storageService: StorageService
  ) {}

  connect() {
    this.socket = io(this.url);

    this.socket.on('connect', () => {
      setTimeout(() => {
        this.join();
      }, 0);
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
