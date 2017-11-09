import { Injectable } from '@angular/core';

import { ProfileService } from '@app/core';
import { Student } from '@app/models';

@Injectable()
export class ProfileGuidelineService {
  private profile: Student;

  constructor(
    private profileService: ProfileService
  ) {
    this.profileService.getProfile().subscribe((profile: Student) => this.profile = profile);
  }

  public getProfile() {
    return this.profile;
  }

  public updateProfile() {
    return this.profileService.updateProfile('Student', this.profile);
  }
}
