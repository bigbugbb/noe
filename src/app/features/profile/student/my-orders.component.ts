import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService, ProfileService } from '@app/core';
import { ProfileOutletEventsService } from './profile-outlet-events.service';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-my-orders',
  template: `
    <noe-order-list [data]="data" (selectPage)="onPageSelected($event)">
    </noe-order-list>
  `,
  styles: [`
    :host(noe-my-orders) {
      padding: 1rem 0.75rem 0rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `]
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private data: { [key: string]: any };
  private page = 1;
  private limit = 20;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private profileService: ProfileService,
    private profileOutletEventsService: ProfileOutletEventsService
  ) {}

  ngOnInit() {
    this.queryOrdersByPage(1);
  }

  ngOnDestroy() {
    this.profileOutletEventsService.notifyOutletDestroyed('orders');
  }

  queryOrdersByPage(page: number) {
    this.page = page;
    const params = {};
    this.profileService.getProfile().subscribe(profile => params['student'] = _.get(profile, '_id'));
    const queryParams = { page, 'params': JSON.stringify([ params ]) };
    this.orderService.getAll(queryParams).subscribe(result => this.data = result);
  }

  onPageSelected(page: number) {
    this.queryOrdersByPage(page);
  }
}
