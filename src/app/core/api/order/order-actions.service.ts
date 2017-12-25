import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { OrderService } from './order.service';
import { ChatService } from '@app/core/chat/chat.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Order, Business, User, Jabber, Message, Thread } from '@app/models';
import { environment } from '@env/environment';
import * as _ from 'lodash';

@Injectable()
export class OrderActionsService {
  private threads: Thread[] = [];
  private subThreads: Subscription;

  constructor(
    private orderService: OrderService,
    private chatService: ChatService,
    private storageService: StorageService
  ) {
    this.chatService.threads$.subscribe((threads: Thread[]) => {
      this.threads = threads;
    });
  }

  public pay(order, opened?, closed?) {
    return new Promise<Order>((resolve, reject) => {
      const { email } = this.storageService.getUser();
      const { _id, price, business } = order;
      const handler = (<any>window).StripeCheckout.configure({
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
        },
        opened,
        closed
      });
      handler.open();

      window.addEventListener('popstate', () => {
        handler.close();
      });
    });
  }

  public refund(order) {
    const { _id, charge } = order;
    return this.orderService.refund(_id, charge).toPromise();
  }

  public contact(order) {
    const customer: User = order.customer;
    const business: Business = order.business;
    let thread = _.find(this.threads, (t) => {
      return (t.author.id === customer._id && t.target.id === business.owner) ||
             (t.target.id === customer._id && t.author.id === business.owner);
    });
    if (_.isEmpty(thread)) {
      thread = this.chatService.createLocalThread(
        new Jabber(customer._id, customer.profile['name'], 'Student', customer.profile['avatar']),
        new Jabber(business.owner, business.ownerName, 'Company', business.avatar)
      );
    }
    this.chatService.accessThread.next(thread);
  }

  public cancel(order, by = 'customer') {
    return this.orderService.cancel(order._id, { 'event_creator': by }).toPromise();
  }

  public serve(order) {
    return this.orderService.serve(order._id).toPromise();
  }
}
