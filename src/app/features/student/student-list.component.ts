import { Component, Input } from '@angular/core';

import { Student } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  @Input()
  public students: Student[] = [];

  constructor() {}

  public idOfStudent(student) {
    return _.isEmpty(student) ? '' : student._id;
  }
}
