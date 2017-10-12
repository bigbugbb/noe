import { Injectable } from '@angular/core';

import { Student } from '@app/models';
import { StudentService } from '@app/core/api/student/student.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProfileService {
  private subject: BehaviorSubject<object>;

  constructor(
    private studentService: StudentService,
    private storageService: StorageService
  ) {
    this.subject = new BehaviorSubject(this.storageService.getProfile());
  }

  public getProfile() {
    return this.subject.asObservable();
  }

  public fetchProfile(user) {
    switch (user.role) {
      case 'student': {
        return this.studentService.getAll({ userId: user._id }).map(result => {
          this.onProfileUpdated(result.students[0]);
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

  public createProfile(role, payload) {
    if (role === 'student') {
      return this.studentService.create(payload as Student).map(profile => {
        this.onProfileUpdated(profile);
        return profile;
      });
    } else if (role === 'school') {

    } else if (role === 'company') {

    } else {

    }
  }

  public updateProfile(role, payload) {
    if (role === 'student') {
      return this.studentService.update(payload as Student).map(result => {
        this.onProfileUpdated(result.student);
      });
    } else if (role === 'school') {

    } else if (role === 'company') {

    } else {

    }
  }

  private onProfileUpdated(profile) {
    if (profile) {
      this.storageService.setProfile(profile);
      this.subject.next(profile);
    }
  }
}