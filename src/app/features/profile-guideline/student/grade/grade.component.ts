import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Student } from '@app/models';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'noe-profile-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['../shared-styles.component.scss', './grade.component.scss']
})
export class GradeComponent implements OnInit {
  private profile: Student;
  private grades: Observable<object[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  ngOnInit() {
    this.grades = this.http.get('@app/../assets/data/grades.json').map((res: Response) => res.json());
  }

  public previous() {
    this.router.navigate(['../country'], { relativeTo: this.route });
  }

  public next() {
    this.router.navigate(['../current-school'], { relativeTo: this.route });
  }
}
