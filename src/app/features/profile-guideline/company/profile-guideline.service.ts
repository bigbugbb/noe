import { Injectable } from '@angular/core';

import { ProfileService } from '@app/core';
import { Company } from '@app/models';

@Injectable()
export class ProfileGuidelineService {
  private profile: Company;

  constructor(
    private profileService: ProfileService
  ) {
    this.profile = this.profileService.getCachedProfile();
  }

  public getProfile() {
    return this.profile;
  }

  public updateProfile() {
    return this.profileService.updateProfile('Company', this.profile);
  }
}
