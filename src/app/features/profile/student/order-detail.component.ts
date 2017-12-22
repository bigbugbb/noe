import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService, ChatService, OrderDetailService, OrderActionsService } from '@app/core';
import { Order, Business, User, Jabber, Message } from '@app/models';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss', '../../shared/loading/loading.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private order: Order = new Order();

  private sub: Subscription;

  private handlingOrderAction = false;

  private editingContent = false;

  private messages = [];
  private connection;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderActionsService: OrderActionsService,
    private orderDetailService: OrderDetailService,
    private chatService: ChatService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.updateOrder(params.id));

    this.chatService.socket.on('connect', () => {
      this.prepareToContact();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  prepareToContact() {
    setTimeout(() => {
      if (!_.isEmpty(this.order)) {
        const { customer, business } = this.order;
        this.chatService.join(`${customer._id}-${business.owner}`);
        this.chatService.join(`${business.owner}-${customer._id}`);
      }
    }, 0);
  }

  updateOrder(id) {
    this.orderDetailService.getOrder().subscribe(result => {
      this.order = <Order>result;
    });
    this.prepareToContact();
    if (this.order._id !== id) {
      this.orderDetailService.fetchOrder(id).subscribe();
    }
  }

  get business() {
    return _.get(this.order, 'business', new Business());
  }

  get avatar() {
    return _.get(this.business, 'avatar', '');
  }

  get name() {
    return _.get(this.business, 'name', 'This is the business name');
  }

  get status() {
    return _.get(this.order, 'status', '');
  }

  get location() {
    const { address, country } = this.business;
    return [ address, country ].filter(value => !_.isEmpty(value)).join(', ');
  }

  get summary() {
    return _.get(this.business, 'summary', 'This is the business summary');
  }

  get price() {
    const price = _.get(this.order, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get content() {
    return _.get(this.business, 'content', '');
  }

  showPay() {
    return this.status === 'created';
  }

  showRefund() {
    return this.status === 'paid';
  }

  showCancel() {
    return this.status === 'created';
  }

  private pay() {
    const opened = () => { this.handlingOrderAction = false; };
    const closed = () => { this.handlingOrderAction = false; };
    this.handlingOrderAction = true;
    this.orderActionsService.pay(this.order, opened, closed).then(value => {
      this.order = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }

  private refund() {
    this.handlingOrderAction = true;
    this.orderActionsService.refund(this.order).then(value => {
      this.order = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }

  private contact() {
    const customer: User = this.order.customer;
    const business: Business = this.order.business;
    const thread = this.chatService.createLocalThread(
      new Jabber(customer._id, customer.profile['name'], customer.profile['avatar']),
      new Jabber(business.owner, business.name, business.avatar)
    );
    this.chatService.accessThread.next(thread);
  }

  private cancel() {
    this.handlingOrderAction = true;
    this.orderActionsService.cancel(this.order).then(value => {
      this.order = value['order'];
      this.handlingOrderAction = false;
    }).catch (() => {
      this.handlingOrderAction = false;
    });
  }
}
