import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Thread } from '@app/models';
import { ChatService } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  private threads: Observable<Thread[]>;

  constructor(
    private chatService: ChatService
  ) {
    this.threads = this.chatService.threads;
  }

  ngOnInit() {
    this.threads.subscribe(threads => {
      console.log(threads);
    });
  }
}
