import { Injectable } from '@angular/core';

import { Student, School, Company } from '@app/models';
import { UserService } from '@app/core/api/user/user.service';
import { StudentService } from '@app/core/api/student/student.service';
import { SchoolService } from '@app/core/api/school/school.service';
import { CompanyService } from '@app/core/api/company/company.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ProfileService {
  private subject: BehaviorSubject<object>;

  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private companyService: CompanyService,
    private storageService: StorageService
  ) {
    this.subject = new BehaviorSubject(this.storageService.getProfile());
  }

  public getProfile() {
    return this.subject.asObservable();
  }

  public setProfile(profile) {
    if (profile) {
      this.storageService.setProfile(profile);
      this.subject.next(profile);
    }
  }

  public fetchProfile(user) {
    return this.userService.getById(user._id).map(result => {
      this.setProfile(result.user.profile);
    });
  }

  public updateProfile(role, payload) {
    switch (role) {
      case 'Student': {
        return this.studentService.update(payload as Student).map(result => {
          this.setProfile(result.student);
        });
      }
      case 'School': {
        return this.schoolService.update(payload as School).map(result => {
          this.setProfile(result.school);
        });
      }
      case 'Company': {
        return this.companyService.update(payload as Company).map(result => {
          this.setProfile(result.company);
        });
      }
      default: {

      }
    }
  }
}
