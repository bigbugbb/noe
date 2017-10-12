import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Student } from '@app/models';
import { environment } from '@env/environment';
import { ApiBase } from '../api-base';
import { StorageService } from '@app/core/storage/storage.service';
import 'rxjs/add/operator/map'

import * as _ from 'lodash';

@Injectable()
export class StudentService extends ApiBase {

  private apiEndpoint: String = environment.apiEndpoint;

  constructor(
    private http: Http,
    protected storageService: StorageService
  ) {
    super(storageService);
  }

  // basic rest operations

  public getAll(params: object) {
    let options = this.optionsWithJWT();

    options.params = new URLSearchParams();
    _.forOwn(params, (val, param) => {
      options.params.set(param, val);
    });

    return this.http.get(`${this.apiEndpoint}/students`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getById(id: string) {
    return this.http.get(`${this.apiEndpoint}/students/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public create(student: Student) {
    return this.http.post(`${this.apiEndpoint}/students`, student, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public update(student: Student) {
    return this.http.patch(`${this.apiEndpoint}/students/${student._id}`, student, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(id: string) {
    return this.http.delete(`${this.apiEndpoint}/students/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }
}