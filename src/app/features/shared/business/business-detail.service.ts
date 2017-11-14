import { Injectable } from '@angular/core';

import { BusinessService } from '@app/core';
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
    return this.subject;
  }

  public fetchBusiness(id) {
    this.businessService.getById(id).subscribe(this.handleResult.bind(this));
    return this.subject.asObservable();
  }

  public updateBusiness(business) {
    return this.businessService.update(business).map(this.handleResult.bind(this));
  }

  private handleResult(result) {
    this.subject.next(_.get(result, 'business', {}));
  }
}
