import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Thread } from '@app/models';
import { ChatService, ThreadService } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-thread-list',
  template: `
    <div *ngFor="let thread of threads | async; let i = index;">
      <hr class="mx-3 my-0" [ngClass]="{ 'transparent': i === 0 }">
      <noe-thread-item [thread]="thread"></noe-thread-item>
    </div>
  `
})
export class ThreadListComponent implements OnInit {
  private threads: Observable<Thread[]>;

  constructor(
    private threadService: ThreadService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.threads = this.chatService.threads$;
  }
}
