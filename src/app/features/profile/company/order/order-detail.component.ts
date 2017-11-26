import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderDetailService } from '@app/core';
import { Order, Business } from '@app/models';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  template: 'noe-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private order: Order = new Order();

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getOrder(params.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getOrder(id) {
    this.orderDetailService.getOrder().subscribe(result => this.order = <Order>result);
    if (this.order._id !== id) {
      this.orderDetailService.fetchOrder(id).subscribe();
    }
  }

  get customer() {
    return _.get(this.order, 'customer', {});
  }

  get customerProfile() {
    return _.get(this.order, 'customer.profile', {});
  }

  get customerAge() {
    const birthday = new Date(_.get(this.customerProfile, 'birthday', Date.now()));
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  get business() {
    return _.get(this.order, 'business', {});
  }

  get businessName() {
    return _.get(this.business, 'name', 'Unknown business name');
  }

  get location() {
    const { city, state, country } = <Business>this.business;
    return [city, state, country].filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.business, 'summary', '');
  }

  get price() {
    const price = _.get(this.order, 'price', 'Not provided');
    const currency = _.get(this.business, 'currency', 'usd');
    if (currency === 'usd') {
      return `$${price}`;
    }
  }
}
