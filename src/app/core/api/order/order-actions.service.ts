import { Injectable } from '@angular/core';

import { OrderService } from './order.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Order } from '@app/models';
import { environment } from '@env/environment';
import * as _ from 'lodash';

@Injectable()
export class OrderActionsService {
  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  public pay(order) {
    return new Promise<Order>((resolve, reject) => {
      const { email } = this.storageService.getUser();
      const { _id, price, business } = order;
      (<any>window).StripeCheckout.configure({
        key: environment.stripePublishableKey,
        email,
        image: business.avatar,
        locale: 'auto',
        name: business.name,
        description: 'Pay for this service',
        amount: price * 100, // dollar -> cent
        token: (token) => {
          const payload = { email, source: token.id };
          this.orderService.pay(_id, payload).subscribe(value => {
            resolve(value);
          }, error => {
            reject(error);
          });
        }
      }).open();
    });
  }

  public refund(order) {
    const { _id, charge } = order;
    return this.orderService.refund(_id, charge).toPromise();
  }

  public contact() {

  }

  public cancel(order, by = 'customer') {
    return this.orderService.cancel(order._id, { 'event_creator': by }).toPromise();
  }

  public serve(order) {
    return this.orderService.serve(order._id).toPromise();
  }
}
