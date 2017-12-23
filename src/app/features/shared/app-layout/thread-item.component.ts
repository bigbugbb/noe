import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Thread } from '@app/models';
import { ThreadService, ChatService, StorageService } from '@app/core';
import { Jabber, User } from '@app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-thread-item',
  template: `
    <div class="callout callout-info m-0 py-3" (click)="accessThread()">
      <div class="avatar float-right">
        <img [src]="avatar" class="img-avatar" alt="name">
        <span *ngIf="messagesNotRead > 0" class="badge badge-danger">{{ messagesNotRead }}</span>
      </div>
      <div><strong>{{ name }}</strong></div>
      <small class="last-message mr-3">{{ lastMessage }}</small>
    </div>
  `,
  styleUrls: ['./thread-item.component.scss']
})
export class ThreadItemComponent implements OnInit {
  @Input()
  private thread: Thread;

  private user: User;
  private access: Subject<Thread> = new Subject<Thread>();

  constructor(
    private chatService: ChatService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    this.access.subscribe(this.chatService.accessThread);
  }

  accessThread() {
    this.access.next(this.thread);
  }

  get author(): Jabber {
    const { author, target } = this.thread;
    return author.id === this.user._id ? author : target;
  }

  get target(): Jabber {
    const { author, target } = this.thread;
    return author.id === this.user._id ? target : author;
  }

  get avatar() {
    return this.target.avatar;
  }

  get name() {
    return this.target.name;
  }

  get lastMessage() {
    return this.thread.lastMessage;
  }

  get messagesNotRead() {
    return this.thread.messagesNotRead;
  }
}
