import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Student } from '@app/models';

@Component({
  selector: 'noe-profile-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['../shared-styles.component.scss', './gender.component.scss']
})
export class GenderComponent {
  private profile: Student;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  public previous() {
    this.router.navigate(['../birthday'], { relativeTo: this.route });
  }

  public next() {
    this.router.navigate(['../country'], { relativeTo: this.route });
  }
}
