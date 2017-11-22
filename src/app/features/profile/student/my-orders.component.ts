import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService, StorageService } from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-my-orders',
  template: `
    <noe-order-list [data]="data" (selectPage)="onPageSelect($event)">
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
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.queryOrdersByPage(1);
  }

  ngOnDestroy() {
  }

  queryOrdersByPage(page: number) {
    this.page = page;
    const customer = this.storageService.getUser()._id;
    const queryParams = { page, 'params': JSON.stringify([ { customer } ]) };
    this.orderService.getAll(queryParams).subscribe(result => this.data = result);
  }

  onPageSelect(page: number) {
    this.queryOrdersByPage(page);
  }
}
