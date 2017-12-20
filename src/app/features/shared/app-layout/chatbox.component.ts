import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ChatService, ChatUIService, StorageService } from '@app/core';
import { User, Thread, Message, Jabber } from '@app/models';

@Component({
  selector: 'noe-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnDestroy {
  @Input()
  private thread: Thread;

  @Input()
  private index: number;

  private user: User;
  private messages: Message[];

  private subMessages: Subscription;

  constructor(
    private chatService: ChatService,
    private chatUIService: ChatUIService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.subMessages = this.chatService.messagesOfThread(this.thread._id)
      .subscribe(messages => this.messages = messages || []);
  }

  ngOnDestroy() {
    this.subMessages.unsubscribe();
  }

  get author(): Jabber {
    const { author, target } = this.thread;
    return author.id === this.user._id ? author : target;
  }

  get target(): Jabber {
    const { author, target } = this.thread;
    return author.id === this.user._id ? target : author;
  }

  isSentToMe(message: Message): boolean {
    return message.target === this.user._id;
  }

  chooseJabber(message: Message): Jabber {
    return this.isSentToMe(message) ? this.target : this.author;
  }

  rightOffset() {
    const isThreadListOpened = this.chatUIService.isThreadListOpened();
    const offset = isThreadListOpened ? 250 : 0;
    const margin = 16;
    return `${offset + this.index * 300 + (this.index + 1) * margin}px`;
  }

  close(event) {
    this.chatService.closeThread.next(this.thread);
    event.preventDefault();
  }
}
