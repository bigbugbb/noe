import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ProfileOutletEventsService {
  private subject: BehaviorSubject<string>;

  constructor() {
    this.subject = new BehaviorSubject('');
  }

  public outletDestroyed() {
    return this.subject.asObservable();
  }

  public notifyOutletDestroyed(outletName) {
    this.subject.next(outletName);
  }
}
