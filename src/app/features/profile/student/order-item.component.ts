import { Component, Input } from '@angular/core';

import { Order } from '@app/models';

@Component({
  selector: 'noe-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input()
  private item: Order;

  @Input()
  private showDivider = true;

  get student() {
    return this.item.student;
  }

  get business() {
    return this.item.business;
  }

  get businessName() {
    return this.item.business.name;
  }

  get businessPrice() {
    return `$${this.item.business.price}`;
  }

  get businessSummary() {
    return this.item.business.summary;
  }

  get orderStatus() {
    return this.item.status;
  }
}
