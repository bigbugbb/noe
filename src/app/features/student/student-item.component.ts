import { Component, Input } from '@angular/core';

import { Student } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent {
  @Input()
  private item: Student;

  @Input()
  private showDivider = true;

  get studentName() {
    return this.item.firstname + ' ' + this.item.lastname;
  }

  get grade() {
    if (!_.isEmpty(this.item.grade)) {
      return this.item.grade + ' student';
    }
  }

  get school() {
    if (!_.isEmpty(this.item.school)) {
      return ' at ' + this.item.school;
    }
  }

  get country() {
    if (!_.isEmpty(this.item.country)) {
      return this.item.country;
    }
  }

  get applying() {
    if (!_.isEmpty(this.item.applying)) {
      return 'Applying: ' + this.item.applying;
    }
  }
}
