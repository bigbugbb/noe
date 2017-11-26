import { Injectable } from '@angular/core';

import { OrderService } from './order.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class OrderDetailService {
  private subject: BehaviorSubject<object>;

  constructor(
    private orderService: OrderService
  ) {
    this.subject = new BehaviorSubject({});
  }

  public getOrder() {
    return this.subject.asObservable().filter(value => !_.isEmpty(value));
  }

  public setOrder(order) {
    if (!_.isEmpty(order)) {
      this.subject.next(order);
    }
  }

  public fetchOrder(id) {
    return this.orderService.getById(id).map(this.handleResult.bind(this));
  }

  public updateOrder(order) {
    return this.orderService.update(order).map(this.handleResult.bind(this));
  }

  private handleResult(result) {
    this.setOrder(_.get(result, 'order', {}));
  }
}
