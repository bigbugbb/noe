import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Company } from '@app/models';

@Component({
  selector: 'noe-profile-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['../shared-styles.component.scss', './introduction.component.scss']
})
export class IntroductionComponent {
  private profile: Company;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  public previous() {
    this.router.navigate(['../country'], { relativeTo: this.route });
  }

  public next() {
    this.pgs.updateProfile().subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
