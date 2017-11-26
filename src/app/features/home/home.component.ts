import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { BusinessService } from '@app/core';
import { BusinessActionsService, BusinessActions } from '@app/features/shared';
import { Business } from '@app/models';
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

  onPageSelect(page: number) {
    this.page = page;
    this.triggerActivitiesQuery();
  }

  triggerActivitiesQuery() {
    const { page, limit } = this;
    // const params business.simplifyQueryParams(this.filterForm.value);
    const queryParams = { page, limit };
    this.router.navigate(['/home'], { queryParams });
  }
}
