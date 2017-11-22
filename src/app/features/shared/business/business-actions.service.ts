import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx';
import { BusinessActions } from './business-actions';

@Injectable()
export class BusinessActionsService {
  private emptyAction = {
    type: BusinessActions.DEFAULT,
    payload: null
  };

  private subject = new BehaviorSubject(this.emptyAction);

  public getAction() {
    return this.subject.asObservable().filter(action => action.type !== BusinessActions.DEFAULT);
  }

  public selectItem(item) {
    this.subject.next({
      type: BusinessActions.SELECT_BUSINESS_ITEM,
      payload: item
    });
    this.subject.next(this.emptyAction);
  }
}
