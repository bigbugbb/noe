import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService, OrderDetailService, OrderActionsService } from '@app/core';
import { Order, Business } from '@app/models';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private order: Order;

  private sub: Subscription;

  private ordering = false;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderActionsService: OrderActionsService,
    private orderDetailService: OrderDetailService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.updateOrder(params.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateOrder(id) {
    this.orderDetailService.getOrder().subscribe(result => this.order = <Order>result);
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
    const { city, state, country } = this.business;
    const address = [city, state, country];
    return address.filter(value => !_.isEmpty(value)).join(', ');
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
    this.orderActionsService.pay(this.order).then(value => {
      this.order = value;
    });
  }

  private refund() {
    this.orderActionsService.refund(this.order).then(value => {
      this.order = value;
    });
  }

  private contact() {

  }

  private cancel() {
    this.orderActionsService.cancel(this.order).then(value => {
      this.order = value;
    });
  }
}
