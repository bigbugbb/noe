import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'noe-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  private total: number;
  private pages = [];

  @Input('totalPages')
  set totalPages(value: number) {
    this.total = value;
    this.pages = _.range(1, value + 1);
  }

  @Input()
  private currentPage = 1;

  @Input()
  private window = 10;

  @Output()
  public select: EventEmitter<number> = new EventEmitter<number>();

  selectPage(event, nextPage) {
    event.preventDefault();
    event.stopPropagation();
    this.select.emit(nextPage);
    this.currentPage = Math.max(1, Math.min(nextPage, this.total));
  }

  isPageSelected(page) {
    return this.currentPage === page;
  }

  hidePrevious() {
    return this.currentPage <= 1;
  }

  hideNext() {
    return this.currentPage >= this.total;
  }
}
