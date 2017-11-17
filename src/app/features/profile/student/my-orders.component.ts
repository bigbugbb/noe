import { Component, OnInit, OnDestroy } from '@angular/core';

import { OrderService, ProfileService } from '@app/core';
import { ProfileOutletEventsService } from './profile-outlet-events.service';
import * as _ from 'lodash';

@Component({
  selector: 'noe-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private orders = [];

  constructor(
    private orderService: OrderService,
    private profileService: ProfileService,
    private profileOutletEventsService: ProfileOutletEventsService
  ) {}

  ngOnInit() {
    const params = {};
    this.profileService.getProfile().subscribe(profile => params['student'] = _.get(profile, '_id'));
    const queryParams = { limit: Number.MAX_SAFE_INTEGER, params: JSON.stringify([ params ]) };
    this.orderService.getAll(queryParams).subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

  ngOnDestroy() {
    this.profileOutletEventsService.notifyOutletDestroyed('orders');
  }
}
