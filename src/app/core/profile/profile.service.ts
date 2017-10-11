import { Injectable } from '@angular/core';

import { Student } from '@app/models';
import { StudentService } from '@app/core/api/student/student.service';

@Injectable()
export class ProfileService {
  public profile;

  constructor(
    private studentService: StudentService
  ) {}

  public fetchProfile(user) {
    switch (user.role) {
      case 'student': {
        return this.studentService.getAll({ userId: user._id }).map(result => {
          this.profile = result.students[0];
        });
      }
      case 'school': {

      }
      case 'company': {

      }
      default: {

      }
    }
  }

  public createProfile(role: string, data: object) {
    if (role === 'student') {
      return this.studentService.create(data as Student);
    } else if (role === 'school') {

    } else if (role === 'company') {

    } else {

    }
  }
}