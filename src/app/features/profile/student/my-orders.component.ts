import { Component, OnInit, OnDestroy } from '@angular/core';

import { OrderService, ProfileService } from '@app/core';
import * as _ from 'lodash';

@Component({
  selector: 'noe-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private orders = [];

  constructor(
    private orderService: OrderService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    let student;
    this.profileService.getProfile().subscribe(profile => student = _.get(profile, '_id'));
    this.orderService.getAll({ student }).subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

  ngOnDestroy() {
    console.log('onDestroy');
  }
}
