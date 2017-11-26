import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Order } from '@app/models';
import { OrderDetailService, OrderActionsService, StorageService } from '@app/core';
import { environment } from '@env/environment';
import * as _ from 'lodash';

@Component({
  selector: 'noe-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  private itemValue: Order;

  @Input()
  private showDivider = true;

  @Output()
  private itemChange = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    private orderActionsService: OrderActionsService,
    private storageService: StorageService
  ) {}

  @Input()
  get item() {
    return this.itemValue;
  }

  set item(value) {
    this.itemValue = value;
    this.itemChange.emit(this.itemValue);
  }

  get customer() {
    return _.get(this.item, 'customer', {});
  }

  get customerAvatar() {
    return _.get(this.customer, 'profile.avatar', '');
  }

  get customerName() {
    const firstname = _.get(this.customer, 'profile.firstname', '');
    const lastname = _.get(this.customer, 'profile.lastname', '');
    let name = (firstname + ' ' + lastname).trim();
    if (_.isEmpty(name)) {
      name = _.get(this.customer, 'profile.name', '');
    }
    return _.isEmpty(name) ? 'Unknown name' : name;
  }

  get business() {
    return this.item.business;
  }

  get businessName() {
    return this.item.business.name;
  }

  get orderPrice() {
    return `$${this.item.price}`;
  }

  get businessSummary() {
    return this.item.business.summary;
  }

  get orderStatus() {
    return this.item.status;
  }

  navigateToOrderDetail(event) {
    event.preventDefault();
    this.orderDetailService.setOrder(this.item);
    this.router.navigate(['orders', this.item._id], { relativeTo: this.route });
  }

  showServed() {
    return this.orderStatus === 'paid';
  }

  showCancel() {
    return this.orderStatus === 'created';
  }

  private served() {

  }

  private details() {
    this.orderDetailService.setOrder(this.item);
    this.router.navigate(['orders', this.item._id], { relativeTo: this.route });
  }

  private contact() {

  }

  private cancel() {
    this.orderActionsService.cancel(this.item).then(value => {
      this.item = value;
    });
  }
}
