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
    switch (user.role.toLowerCase()) {
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
    switch (role.toLowerCase()) {
      case 'student': {
        return this.studentService.create(payload as Student).map(profile => {
          this.onProfileUpdated(profile);
          return profile;
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

  public updateProfile(role, payload) {
    switch (role.toLowerCase()) {
      case 'student': {
        return this.studentService.update(payload as Student).map(result => {
          this.onProfileUpdated(result.student);
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

  public updateWithExistingProfile(profile) {
    this.onProfileUpdated(profile);
  }

  private onProfileUpdated(profile) {
    if (profile) {
      this.storageService.setProfile(profile);
      this.subject.next(profile);
    }
  }
}