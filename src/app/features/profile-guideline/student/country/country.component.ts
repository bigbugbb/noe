import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileGuidelineService } from '../profile-guideline.service';
import { Student } from '@app/models';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'noe-profile-country',
  templateUrl: './country.component.html',
  styleUrls: ['../shared-styles.component.scss', './country.component.scss']
})
export class CountryComponent implements OnInit {
  private profile: Student;
  private countries: Observable<object[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private pgs: ProfileGuidelineService
  ) {
    this.profile = pgs.getProfile();
  }

  ngOnInit() {
    this.countries = this.http.get('@app/../assets/data/countries.json').map((res: Response) => res.json());
  }

  public previous() {
    this.router.navigate(['../gender'], { relativeTo: this.route });
  }

  public next() {
    this.router.navigate(['../grade'], { relativeTo: this.route });
  }
}
