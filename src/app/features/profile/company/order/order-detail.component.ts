import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderDetailService } from '@app/core';
import { Order, Business } from '@app/models';
import { OrderPriceEditDialogComponent } from '../dialogs';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  template: 'noe-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  @ViewChild('priceEditDialog')
  private priceEditDialog: OrderPriceEditDialogComponent;

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
    this.orderDetailService.getOrder().subscribe(result => this.order = <Order>JSON.parse(JSON.stringify(result)));
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
    const { address, country } = <Business>this.business;
    return [ address, country ].filter(item => !_.isEmpty(item)).join(', ');
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

  get events() {
    return _.get(this.order, 'events', []);
  }

  editPrice(event) {
    event.preventDefault();
    this.priceEditDialog.show();
  }

  eventTitle(event) {
    const { name, creator } = event;
    switch (name) {
      case 'created':
      case 'paid':
      case 'canceled': {
        return `Order was ${name} by ${creator}`;
      }
      case 'refunded': {
        return 'Order was refunded to customer';
      }
      case 'served': {
        return 'Order has been served by service provider';
      }
      default: {
        console.error('Invalid order event');
        return 'Invalid order event';
      }
    }
  }

  colorOfEvent(event) {
    const { name } = event;
    const primary = '#20a8d8';
    const secondary = '#a4b7c1';
    const warning = '#ffc107';
    const success = '#4dbd74';
    const info = '#63c2de';
    switch (name) {
      case 'created': return primary;
      case 'paid': return success;
      case 'canceled': return warning;
      case 'refunded': return secondary;
      case 'served': return success;
    }
  }
}
