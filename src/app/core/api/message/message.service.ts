import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Message } from '@app/models';
import { environment } from '@env/environment';
import { ApiBase } from '../api-base';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class MessageService extends ApiBase {
  private apiEndpoint: string = environment.apiEndpoint;

  constructor(
    private http: Http,
    protected storageService: StorageService,
  ) {
    super(storageService);
  }

  // basic rest operations

  public getAll(threadId: string, params: object) {
    const options = this.optionsWithJWT();

    options.params = new URLSearchParams();
    _.forOwn(params, (val, param) => options.params.set(param, val));

    return this.http.get(`${this.apiEndpoint}/threads/${threadId}/messages`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public create(message: Message) {
    return this.http.post(`${this.apiEndpoint}/messages`, { message }, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }
}
