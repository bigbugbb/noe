import { Component, Input, OnInit } from '@angular/core';

import { ChatService, ChatUIService } from '@app/core';
import { Thread, Message } from '@app/models';

@Component({
  selector: 'noe-chatbox',
  template: `
    <div class="popup-box" [ngStyle]="{ 'right': rightOffset() }">
      <div class="popup-head">
        <div class="popup-head-left">test</div>
        <div class="popup-head-right">
          <a href (click)="close($event)">&#10005;</a>
        </div>
        <div style="clear: both">
        </div>
      </div>
      <div class="popup-messages"></div>
    </div>
  `,
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @Input()
  private thread: Thread;

  @Input()
  private index: number;

  constructor(
    private chatService: ChatService,
    private chatUIService: ChatUIService
  ) {}

  ngOnInit() {}

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
