import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-list',
  template: `
    <div class="row mb-auto animated fadeIn">
      <noe-business-item
          class="col-lg-12 col-xl-6"
          *ngFor="let business of businesses; let i = index; trackBy: trackByIndex"
          [item]="business">
      </noe-business-item>
    </div>
    <noe-pagination
        (select)="selectPage.emit($event)"
        [total]="totalPages"
        [page]="currentPage"
        [window]="10">
    </noe-pagination>
  `,
  styles: [`
    :host(noe-business-list) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `]
})
export class BusinessListComponent {
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

  get businesses(): Business[] {
    return _.get(this.data, 'businesses', []);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  showDivider(index) {
    return index !== this.businesses.length - 1;
  }
}
