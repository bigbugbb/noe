import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Order } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-order-list',
  styles: [`
    :host(noe-order-list) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
    }
  `],
  template: `
    <div class="py-3 mb-auto">
      <noe-order-item *ngFor="let order of orders; let i = index; trackBy: trackByIndex"
        [(item)]="orders[i]" [showDivider]="showDivider(i)">
      </noe-order-item>
    </div>
    <div>
      <noe-pagination
              (select)="selectPage.emit($event)"
              [total]="totalPages"
              [page]="currentPage"
              [window]="10">
      </noe-pagination>
    </div>
  `
})
export class OrderListComponent {
  @Input()
  private data: { [key: string]: any };

  @Output()
  private selectPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  get sizePerPage(): number {
    return _.get(this.data, 'limit', 20);
  }

  get currentPage(): number {
    return _.get(this.data, 'page', 1);
  }

  get totalPages(): number {
    return _.ceil(_.get(this.data, 'total', 0) / this.sizePerPage);
  }

  get orders(): Order[] {
    return _.get(this.data, 'orders', []);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  showDivider(index) {
    return index !== this.orders.length - 1;
  }
}
