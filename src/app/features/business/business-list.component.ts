import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
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

  showDivider(index) {
    return index !== this.businesses.length - 1;
  }
}
