import { Component, Input, OnInit } from '@angular/core';

import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.scss']
})
export class BusinessItemComponent implements OnInit {
  @Input()
  private item: Business;

  ngOnInit() {}

  public itemLink(item) {
    return `/services/${item._id}`;
  }

  get name() {
    return _.get(this.item, 'name', 'Unknown business name');
  }

  get price() {
    const price = _.get(this.item, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get numberOfOrders() {
    const order = _.get(this.item, 'orders', []);
    return order.length > 0 ? `${order.length} orders` : '';
  }
}
