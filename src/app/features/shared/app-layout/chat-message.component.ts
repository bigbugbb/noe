import { Component, Input, OnInit } from '@angular/core';

import { Message, Jabber } from '@app/models';

@Component({
  selector: 'noe-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input()
  private index: number;

  @Input()
  private message: Message;

  @Input()
  private jabber: Jabber;

  @Input()
  private isSentToMe: boolean;

  constructor() {}
}
