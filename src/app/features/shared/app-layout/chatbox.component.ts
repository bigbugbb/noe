import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ChatService, ChatUIService, StorageService } from '@app/core';
import { User, Thread, Message, Jabber } from '@app/models';

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

  private subMessages: Subscription;

  constructor(
    private chatService: ChatService,
    private chatUIService: ChatUIService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.subMessages = this.chatService.messagesOfThread(this.thread)
      .subscribe(messages => this.messages = messages || []);

    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subMessages.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollMessages.nativeElement.scrollTop = this.scrollMessages.nativeElement.scrollHeight;
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
  }

  close(event) {
    this.chatService.closeThread.next(this.thread);
    event.preventDefault();
  }
}
