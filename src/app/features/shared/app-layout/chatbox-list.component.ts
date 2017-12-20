import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ChatService } from '@app/core';
import { Thread } from '@app/models';

@Component({
  selector: 'noe-chatbox-list',
  template: `
    <noe-chatbox
      *ngFor="let thread of threads | async; let i = index; "
      class="animated fadeIn"
      [thread]="thread"
      [index]="i">
    </noe-chatbox>
  `
})
export class ChatboxListComponent implements OnInit {

  private threads: Observable<Thread[]>;

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.threads = this.chatService.openedThreads;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
