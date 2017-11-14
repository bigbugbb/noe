import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { BusinessService } from '@app/core';
import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, OnDestroy {
  private filters: { [key: string]: any };

  private sub: Subscription;

  private page = 1;
  private limit = 20;

  private data: { [key: string]: any };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.page = _.get(queryParams, 'page', 1);
      this.limit = _.get(queryParams, 'limit', 20);
      this.businessService.getAll(queryParams).subscribe(result => this.data = result);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onPageSelected(page: number) {
    this.page = page;
    this.triggerActivitiesQuery();
  }

  triggerActivitiesQuery() {
    const { page, limit } = this;
    // const params business.simplifyQueryParams(this.filterForm.value);
    const queryParams = { page, limit };
    this.router.navigate(['/businesses'], { queryParams });
  }
}

