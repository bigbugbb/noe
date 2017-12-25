import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Message, Jabber, User } from '@app/models';

@Component({
  selector: 'noe-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input()
  private index: number;

  @Input()
  private user: User;

  @Input()
  private message: Message;

  @Input()
  private jabber: Jabber;

  @Input()
  private isSentToMe: boolean;

  constructor(
    private router: Router
  ) {}

  // navigateToJabber(event) {
  //   if (this.user._id === this.jabber.id) {
  //     const role = this.jabber.role.toLocaleLowerCase();
  //     this.router.navigate([`/profile/${role}`]);
  //   } else {

  //   }
  //   event.preventDefault();
  // }
}
