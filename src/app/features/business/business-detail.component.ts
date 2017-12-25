import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import {
  StorageService,
  OrderService,
  BusinessDetailService
} from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: [
    '../shared/business/shared-business-styles.scss',
    './business-detail.component.scss'
  ]
})
export class BusinessDetailComponent implements OnInit, OnDestroy {
  private model: { [key: string]: any } = {};
  private content = '';

  private sub: Subscription;

  private ordering = false;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private orderService: OrderService,
    private storageService: StorageService,
    private businessDetailService: BusinessDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.businessDetailService.fetchBusiness(id).subscribe();
        this.businessDetailService.getBusiness().subscribe(business => {
          this.model = business;
          this.fetchContent(_.get(this.model, 'content', ''));
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchContent(url) {
    if (_.isEmpty(url) || !url.startsWith('http')) { return; }
    this.http.get(url).subscribe(value => this.content = _.get(value, '_body', ''));
  }

  get name() {
    return _.get(this.model, 'name', 'This is the business name');
  }

  get location() {
    const { address, country } = this.model;
    return [ address, country ].filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.model, 'summary', 'This is the business summary');
  }

  get price() {
    const price = _.get(this.model, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  public order() {
    if (this.ordering) {
      return;
    }
    this.ordering = true;

    const customerId = this.storageService.getUser()._id;
    const businessId = this.model._id;
    const price = this.model.price;

    this.orderService.create({ customerId, businessId, price }).subscribe(order => {
      this.businessDetailService.setBusiness(order.business);
      this.ordering = false;
      // navigate to order detail page
      this.router.navigate(['/profile/student', order._id]);
    });
  }
}
