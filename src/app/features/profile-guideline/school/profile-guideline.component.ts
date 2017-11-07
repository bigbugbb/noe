import { Component, OnInit } from '@angular/core';

import { ProfileService, StorageService } from '@app/core';
import * as _ from 'lodash';

@Component({
  selector: 'noe-profile-guideline',
  templateUrl: './profile-guideline.component.html',
  styleUrls: ['./profile-guideline.component.scss']
})
export class ProfileGuidelineComponent implements OnInit {
  public profile;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    // const user = this.storageService.getUser();
    // this.profileService.fetchProfile(user).subscribe();
    // this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
