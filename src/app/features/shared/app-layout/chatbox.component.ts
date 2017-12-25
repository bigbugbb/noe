import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ChatService, ChatUIService, StorageService } from '@app/core';
import { User, Thread, Message, Jabber } from '@app/models';
import { setTimeout } from 'timers';

@Component({
  selector: 'noe-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  private thread: Thread;

  @Input()
  private index: number;

  @ViewChild('scrollMessages')
  private scrollMessages: ElementRef;

  private user: User;
  private inputText: string;
  private messages: Message[];
  private lastTime: number;

  private toBottom = true;
  private loading = false;

  private subMessages: Subscription;
  private subMessageSentAt: Subscription;

  constructor(
    private chatService: ChatService,
    private chatUIService: ChatUIService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.subMessages = this.chatService.messagesOfThread(this.thread)
      .subscribe(messages => {
        this.loading = false;
        this.messages = messages || [];
      });
    this.subMessageSentAt = this.chatService.startingMessageSentAtOfThread(this.thread)
      .subscribe(sentAt => this.lastTime = sentAt.getTime());

    this.chatService.socket.on('message-added', (message) => {
      setTimeout(() => this.scrollToBottom(), 1);
    });
  }

  ngOnDestroy() {
    this.subMessages.unsubscribe();
    this.subMessageSentAt.unsubscribe();
  }

  ngAfterViewChecked() {
    if (this.toBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      const element = this.scrollMessages.nativeElement;
      element.scrollTop = element.scrollHeight - element.clientHeight;
    } catch (e) {
      console.log(e);
    }
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

  onEnter(event) {
    // send a message from the author to the target
    const message = new Message(this.author.id, this.target.id, this.thread, this.inputText);
    this.chatService.sendMessage(message);
    this.inputText = '';
    this.toBottom = true;
  }

  // @HostListener('scroll', ['$event'])
  onScroll(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    const scrollTop = this.scrollMessages.nativeElement.scrollTop;
    if (scrollTop === 0) {
      this.loading = true;
      this.chatService.fetchRemoteMessagesOfThread(this.thread, 10, this.lastTime);
    }
    // prevent scollToBottom from being called because scroll event
    // triggers ngAfterViewChecked, otherwise the view won't be scrollable.
    this.toBottom = false;
  }

  close(event) {
    this.chatService.closeThread.next(this.thread);
    event.preventDefault();
  }
}
