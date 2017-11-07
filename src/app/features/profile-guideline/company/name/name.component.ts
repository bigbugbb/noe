import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Company } from '@app/models';

@Component({
  selector: 'noe-profile-name',
  templateUrl: './name.component.html',
  styleUrls: ['../shared-styles.component.scss', './name.component.scss']
})
export class NameComponent {
  private profile: Company;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  public next() {
    this.router.navigate(['../country'], { relativeTo: this.route });
  }
}
