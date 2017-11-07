import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Student } from '@app/models';

@Component({
  selector: 'noe-profile-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['../shared-styles.component.scss', './birthday.component.scss']
})
export class BirthdayComponent implements OnInit {
  private profile: Student;
  private bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-blue'});
  }

  public previous() {
    this.router.navigate(['../name'], { relativeTo: this.route });
  }

  public next() {
    this.router.navigate(['../gender'], { relativeTo: this.route });
  }
}
