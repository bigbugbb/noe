import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Order } from '@app/models';
import { OrderDetailService, StorageService } from '@app/core';
import { OrderActionService } from './order-action.service';
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
    private orderDetailService: OrderDetailService,
    private orderActionService: OrderActionService,
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
    this.orderActionService.pay(this.item).then(value => {
      this.item = value;
    });
  }

  private refund() {
    this.orderActionService.refund(this.item).then(value => {
      this.item = value;
    });
  }

  private contact() {

  }

  private cancel() {
    this.orderActionService.cancel(this.item).then(value => {
      this.item = value;
    });
  }
}
