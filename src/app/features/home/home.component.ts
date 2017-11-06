import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { ActivityService } from '@app/core';
import { Activity } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private filters: { [key: string]: any };

  private sub: Subscription;

  private page = 1;
  private limit = 20;

  private result: { [key: string]: any };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.activityService.cacheQueryParams(_.get(queryParams, 'params'));
      this.activityService.filtersFromCachedQueryParams().subscribe(filters => this.filters = filters);
      this.activityService.getAll(queryParams).subscribe(result => this.result = result);
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
    // const params = this.activityService.simplifyQueryParams(this.filterForm.value);
    const queryParams = { page, limit, params: JSON.stringify([{}]) };
    this.router.navigate(['/home'], { queryParams });
  }
}
