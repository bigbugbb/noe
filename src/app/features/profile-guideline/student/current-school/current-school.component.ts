import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Student } from '@app/models';

@Component({
  selector: 'noe-profile-current-school',
  templateUrl: './current-school.component.html',
  styleUrls: ['../shared-styles.component.scss', './current-school.component.scss']
})
export class CurrentSchoolComponent {
  private profile: Student;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  public previous() {
    this.router.navigate(['../grade'], { relativeTo: this.route });
  }

  public next() {
    this.pgs.updateProfile().subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
