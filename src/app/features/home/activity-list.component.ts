import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Activity } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {
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

  get activities(): Activity[] {
    return _.get(this.data, 'activities', []);
  }

  showDivider(index) {
    return index !== this.activities.length - 1;
  }
}
