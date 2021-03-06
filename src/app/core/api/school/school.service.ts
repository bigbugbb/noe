import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { School } from '@app/models';
import { environment } from '@env/environment';
import { ApiBase } from '../api-base';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class SchoolService extends ApiBase {

  private apiEndpoint: string = environment.apiEndpoint;

  private templateQueryParams;

  constructor(
    private http: Http,
    protected storageService: StorageService
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

    return this.http.get(`${this.apiEndpoint}/schools`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getById(id: string) {
    return this.http.get(`${this.apiEndpoint}/schools/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public create(school: School) {
    return this.http.post(`${this.apiEndpoint}/schools`, school, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public update(school: School) {
    return this.http.patch(`${this.apiEndpoint}/schools/${school._id}`, school, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(id: string) {
    return this.http.delete(`${this.apiEndpoint}/schools/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  // utils methods

  public cacheQueryParams(queryParams) {
    if (!queryParams) {
      this.storageService.setSchoolQueryParams({});
      return;
    }

    try {
      const params = _.first(JSON.parse(queryParams));
      this.storageService.setSchoolQueryParams(params);
    } catch (err) {
      console.log(err);
    }
  }

  public filtersFromCachedQueryParams() {
    const params = this.storageService.getSchoolQueryParams() || {};
    if (_.isEmpty(this.templateQueryParams)) {
      return this.http.get('@app/../assets/data/schools-query-params.json').map(res => {
        this.templateQueryParams = res.json();
        const templateQueryParams = JSON.parse(JSON.stringify(this.templateQueryParams));
        return _.assign(templateQueryParams, params);
      });
    } else {
      const templateQueryParams = JSON.parse(JSON.stringify(this.templateQueryParams));
      return Observable.of(_.assign(templateQueryParams, params));
    }
  }

  public simplifyQueryParams(queryParams) {
    const params = {};

    _.forOwn(queryParams, (value, key) => {
      value = _.isString(value) ? value.trim() : value;
      if (!_.isEmpty(value)) {
        if (_.isObject(value)) {
          const omits = [];
          _.forOwn(value, (subValue, subKey) => {
            if (!_.isNumber(subValue)) {
              omits.push(subKey);
            }
          });
          value = _.omit(value, omits);
          if (!_.isEmpty(value)) {
            params[key] = value;
          }
        } else {
          params[key] = value;
        }
      }
    });

    return params;
  }
}
