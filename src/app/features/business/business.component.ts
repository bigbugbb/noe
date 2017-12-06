import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { BusinessService } from '@app/core';
import { Business } from '@app/models';
import { BusinessActionsService, BusinessActions } from '@app/features/shared';
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
    private businessService: BusinessService,
    private businessActionsService: BusinessActionsService
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.page = _.get(queryParams, 'page', 1);
      this.limit = _.get(queryParams, 'limit', 20);
      this.businessService.cacheQueryParams(_.get(queryParams, 'params'));
      this.businessService.filtersFromCachedQueryParams().subscribe(filters => this.filters = filters);
      this.businessService.getAll(queryParams).subscribe(result => this.data = result);
    });

    this.businessActionsService.getAction().subscribe(action => {
      const { type, payload } = action;
      switch (type) {
        case BusinessActions.SELECT_BUSINESS_ITEM: {
          this.router.navigate(['/services', payload._id]);
        } break;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get dataAvailable() {
    return !_.isEmpty(this.data);
  }

  onPageSelect(page: number) {
    this.page = page;
    this.triggerActivitiesQuery();
  }

  triggerActivitiesQuery() {
    const { page, limit } = this;
    const params = { status: 'active' };
    const queryParams = { page, limit, params: JSON.stringify([ params ]) };
    this.router.navigate(['/businesses'], { queryParams });
  }
}

