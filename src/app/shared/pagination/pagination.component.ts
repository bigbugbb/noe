import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'noe-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input()
  private total = 0;

  @Input()
  private page = 1;

  @Input()
  private window = 10;

  @Output()
  public select: EventEmitter<number> = new EventEmitter<number>();

  get pages() {
    if (this.total <= 0 || this.window <= 0) {
      return [];
    }

    if (this.window >= this.total) {
      return _.range(1, this.total + 1);
    }

    let start = Math.max(this.page - _.floor((this.window - 1) / 2), 1);
    const end = Math.min(start + this.window, this.total + 1);
    if (end - start < this.window) {
      start = end - this.window;
    }
    return _.range(start, end);
  }

  selectPage(event, nextPage) {
    event.preventDefault();
    event.stopPropagation();
    this.select.emit(nextPage);
    this.page = Math.max(1, Math.min(nextPage, this.total));
  }

  isPageSelected(page) {
    return this.page === page;
  }

  hidePrevious() {
    return this.page <= 1;
  }

  hideNext() {
    return this.page >= this.total;
  }
}
