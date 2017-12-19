import { Injectable } from '@angular/core';

@Injectable()
export class ChatUIService {
  private threadListOpened = false;

  public toggleThreadList() {
    this.threadListOpened = !this.threadListOpened;
  }

  public isThreadListOpened() {
    return this.threadListOpened;
  }
}
