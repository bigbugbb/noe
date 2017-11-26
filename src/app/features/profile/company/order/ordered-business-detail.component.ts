import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Order, Business } from '@app/models';
import { OrderDetailService } from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-ordered-business-detail',
  templateUrl: './ordered-business-detail.component.html',
  styleUrls: [
    '../../../shared/business/shared-business-styles.scss',
    './ordered-business-detail.component.scss'
  ]
})
export class OrderedBusinessDetailComponent implements OnInit, OnDestroy {
  private model: { [key: string]: any } = {};

  private sub: Subscription;

  private ordering = false;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.orderDetailService.fetchOrder(id).subscribe();
        this.orderDetailService.getOrder().subscribe(value => this.model = value);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get business() {
    return _.get(this.model, 'business', {});
  }

  get name() {
    return _.get(this.business, 'name', 'This is the business name');
  }

  get location() {
    const { city, state, country } = <Business>this.business;
    const address = [city, state, country];
    return address.filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.business, 'summary', 'This is the business summary');
  }

  get price() {
    const price = _.get(this.model, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get content() {
    return _.get(this.business, 'content', '');
  }
}
