import { Component, Input, OnInit } from '@angular/core';

import { Business } from '@app/models';
import { BusinessActionsService } from './business-actions.service';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.scss']
})
export class BusinessItemComponent implements OnInit {
  @Input()
  private item: Business;

  constructor(
    private businessActionService: BusinessActionsService
  ) {}

  ngOnInit() {}

  private selectItem(event) {
    event.preventDefault();
    this.businessActionService.selectItem(this.item);
  }

  get name() {
    return _.get(this.item, 'name', 'Unknown business name');
  }

  get summary() {
    return _.get(this.item, 'summary', '');
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
