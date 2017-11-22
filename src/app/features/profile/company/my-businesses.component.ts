import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessService, StorageService } from '@app/core';
import { Business } from '@app/models';
import { BusinessActionsService, BusinessActions } from '@app/features/shared';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-my-businesses',
  templateUrl: './my-businesses.component.html',
  styleUrls: ['./my-businesses.component.scss']
})
export class MyBusinessesComponent implements OnInit, OnDestroy {
  private data: { [key: string]: any };
  private page = 1;
  private limit = 20;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private businessService: BusinessService,
    private businessActionsService: BusinessActionsService
  ) {}

  ngOnInit() {
    this.queryOrdersByPage(1);
    this.businessActionsService.getAction().subscribe(action => {
      const { type, payload } = action;
      switch (type) {
        case BusinessActions.SELECT_BUSINESS_ITEM: {
          this.router.navigate(['businesses', payload._id], { relativeTo: this.route });
        } break;
      }
    });
  }

  ngOnDestroy() {
  }

  get businesses() {
    return _.get(this.data, 'businesses', []);
  }

  public createBusiness() {
    const business: Business = new Business();
    business.owner = this.storageService.getUser()._id;
    this.businessService.create(business).subscribe(model => {
      this.router.navigate(['businesses', model._id], { relativeTo: this.route });
    });
  }

  queryOrdersByPage(page: number) {
    this.page = page;
    const owner = this.storageService.getUser()._id;
    const queryParams = { page, 'params': JSON.stringify([ { owner } ]) };
    this.businessService.getAll(queryParams).subscribe(value => this.data = value);
  }

  onPageSelect(page: number) {
    this.queryOrdersByPage(page);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
