import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Order, Student } from '@app/models';
import { environment } from '@env/environment';
import { ApiBase } from '../api-base';
import { ProfileService } from '@app/core/profile/profile.service';
import { StorageService } from '@app/core/storage/storage.service';
import { BusinessDetailService } from '@app/core/api/business/business-detail.service';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class OrderService extends ApiBase {

  private apiEndpoint: string = environment.apiEndpoint;

  private templateQueryParams;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private businessDetailService: BusinessDetailService,
    protected storageService: StorageService,
  ) {
    super(storageService);
  }

  // basic rest operations

  public getAll(params: object) {
    const options = this.optionsWithJWT();

    options.params = new URLSearchParams();
    _.forOwn(params, (val, param) => {
      options.params.set(param, val);
    });

    return this.http.get(`${this.apiEndpoint}/orders`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getById(id: string) {
    return this.http.get(`${this.apiEndpoint}/orders/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public create(payload) {
    return this.http.post(`${this.apiEndpoint}/orders`, payload, this.optionsWithJWT())
      .map(this.extractData)
      .map(this.updateLocalData.bind(this))
      .catch(this.handleError);
  }

  public update(order: Order) {
    return this.http.patch(`${this.apiEndpoint}/orders/${order._id}`, order, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  // update the associated profile after create or delete operation

  private updateLocalData(order) {
    const user = this.storageService.getUser();
    this.profileService.fetchProfile(user).subscribe();
    this.businessDetailService.setBusiness(order.business);
    return order;
  }
}
