import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Order } from '@app/models';
import { OrderService, OrderDetailService, StorageService } from '@app/core';
import { environment } from '@env/environment';

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
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
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

  navigateToDetail(event) {
    event.preventDefault();
    this.orderDetailService.setOrder(this.item);
    this.router.navigate(['orders', this.item._id], { relativeTo: this.route });
  }

  showPay() {
    return this.orderStatus === 'created';
  }

  showRefund() {
    return this.orderStatus === 'paid';
  }

  showCancel() {
    return this.orderStatus === 'created';
  }

  private pay() {
    const amount = this.item.business.price * 100;
    const handler = (<any>window).StripeCheckout.configure({
      key: environment.stripePublishableKey,
      image: this.business.avatar,
      locale: 'auto',
      token: (token) => {
        const { email } = this.storageService.getUser();
        const orderId = this.item._id;
        const payload = { email, source: token.id };
        this.orderService.pay(orderId, payload).subscribe(result => {
          this.item = result.order;
        });
      }
    });

    handler.open({
      name: this.businessName,
      description: 'Pay for this service',
      amount
    });
  }

  private refund() {
    this.orderService.refund(this.item._id, this.item.charge).subscribe(result => {
      this.item = result.order;
    });
  }

  private contact() {

  }

  private cancel() {
    this.item.status = 'canceled';
    this.orderService.update(this.item).subscribe(result => {
      this.item = result.order;
    });
  }
}
