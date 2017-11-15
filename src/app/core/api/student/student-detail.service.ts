import { Injectable } from '@angular/core';

import { StudentService } from './student.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class StudentDetailService {
  private subject: BehaviorSubject<object>;

  constructor(
    private studentService: StudentService
  ) {
    this.subject = new BehaviorSubject({});
  }

  public getStudent() {
    return this.subject.asObservable();
  }

  public setStudent(student) {
    if (!_.isEmpty(student)) {
      this.subject.next(student);
    }
  }

  public fetchStudent(id) {
    return this.studentService.getById(id).map(this.handleResult.bind(this));
  }

  public updateStudent(student) {
    return this.studentService.update(student).map(this.handleResult.bind(this));
  }

  private handleResult(result) {
    this.setStudent(_.get(result, 'student', {}));
  }
}
