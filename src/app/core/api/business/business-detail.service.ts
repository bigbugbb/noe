import { Injectable } from '@angular/core';

import { BusinessService } from './business.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class BusinessDetailService {
  private subject: BehaviorSubject<object>;

  constructor(
    private businessService: BusinessService
  ) {
    this.subject = new BehaviorSubject({});
  }

  public getBusiness() {
    return this.subject.asObservable();
  }

  public setBusiness(business) {
    if (!_.isEmpty(business)) {
      this.subject.next(business);
    }
  }

  public fetchBusiness(id) {
    return this.businessService.getById(id).map(this.handleResult.bind(this));
  }

  public updateBusiness(business) {
    return this.businessService.update(business).map(this.handleResult.bind(this));
  }

  private handleResult(result) {
    const business = _.get(result, 'business', {});
    this.setBusiness(business);
    return business;
  }
}
