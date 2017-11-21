import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessDetailService } from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-preview',
  templateUrl: './business-preview.component.html',
  styleUrls: [
    '../../../shared/business/shared-business-styles.scss',
    './business-preview.component.scss'
  ]
})
export class BusinessPreviewComponent implements OnInit, OnDestroy {
  private model: { [key: string]: any } = {};

  private sub: Subscription;

  private ordering = false;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessDetailService: BusinessDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.businessDetailService.fetchBusiness(id).subscribe();
        this.businessDetailService.getBusiness().subscribe(business => this.model = business);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get name() {
    return _.get(this.model, 'name', 'This is the business name');
  }

  get location() {
    const { city, state, country } = this.model;
    const address = [city, state, country];
    return address.filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.model, 'summary', 'This is the business summary');
  }

  get price() {
    const price = _.get(this.model, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get content() {
    return _.get(this.model, 'content', '');
  }
}
