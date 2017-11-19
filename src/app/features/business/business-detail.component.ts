import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  StorageService,
  OrderService,
  BusinessDetailService
} from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, OnDestroy {
  private model: { [key: string]: any } = {};

  private sub: Subscription;

  private ordering = false;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private storageService: StorageService,
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
    });
  }
}
