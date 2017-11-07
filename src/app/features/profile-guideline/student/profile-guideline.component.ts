import { Component, OnInit } from '@angular/core';

import { ProfileService, StorageService } from '@app/core';
import { Student } from '@app/models';
import { ProfileGuidelineService } from './profile-guideline.service';
import * as _ from 'lodash';

@Component({
  selector: 'noe-profile-guideline',
  templateUrl: './profile-guideline.component.html',
  styleUrls: ['./profile-guideline.component.scss'],
  providers: [
    ProfileGuidelineService
  ]
})
export class ProfileGuidelineComponent implements OnInit {
  public profile: Student;

  constructor(
    private pgs: ProfileGuidelineService
  ) { }

  ngOnInit() {
    this.profile = this.pgs.getProfile();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return this.profile; }
}
