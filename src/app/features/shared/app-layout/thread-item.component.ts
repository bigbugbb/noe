import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Thread } from '@app/models';
import { ThreadService, ChatService } from '@app/core';
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

  private access: Subject<Thread> = new Subject<Thread>();

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.access.subscribe(this.chatService.accessThread);
  }

  accessThread() {
    this.access.next(this.thread);
  }

  get avatar() {
    return this.thread.target.avatar;
  }

  get name() {
    return this.thread.target.name;
  }

  get lastMessage() {
    return this.thread.lastMessage;
  }

  get messagesNotRead() {
    return this.thread.messagesNotRead;
  }
}
