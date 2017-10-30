import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Student } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
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

  get students(): Student[] {
    return _.get(this.data, 'students', []);
  }

  showDivider(index) {
    return index !== this.students.length - 1;
  }
}
