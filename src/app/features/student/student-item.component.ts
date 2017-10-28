import { Component, Input } from '@angular/core';

import { Student } from '@app/models';

@Component({
  selector: 'noe-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent {
  @Input()
  private item: Student;
}
