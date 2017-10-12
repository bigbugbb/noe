import { Injectable } from '@angular/core';

import { Student } from '@app/models';
import { StudentService } from '@app/core/api/student/student.service';
import { StorageService } from '@app/core/storage/storage.service';

@Injectable()
export class ProfileService {
  private profile;

  constructor(
    private studentService: StudentService,
    private storageService: StorageService
  ) {}

  public getProfile() {
    if (this.profile) {
      return this.profile;
    } else {
      this.profile = this.storageService.getProfile();
      return this.profile;
    }
  }

  public fetchProfile(user) {
    switch (user.role) {
      case 'student': {
        return this.studentService.getAll({ userId: user._id }).map(result => {
          this.profile = result.students[0];
          this.storageService.setProfile(this.profile);
          return this.profile;
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
        this.profile = profile;
        this.storageService.setProfile(this.profile);
        return this.profile;
      });
    } else if (role === 'school') {

    } else if (role === 'company') {

    } else {

    }
  }

  public updateProfile(role, payload) {
    if (role === 'student') {
      return this.studentService.update(payload as Student).map(result => {
        this.profile = result.student;
        this.storageService.setProfile(this.profile);
        return this.profile;
      });
    } else if (role === 'school') {

    } else if (role === 'company') {

    } else {

    }
  }
}