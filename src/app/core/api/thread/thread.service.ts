import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Thread } from '@app/models';
import { environment } from '@env/environment';
import { ApiBase } from '../api-base';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class ThreadService extends ApiBase {
  private apiEndpoint: string = environment.apiEndpoint;

  constructor(
    private http: Http,
    protected storageService: StorageService,
  ) {
    super(storageService);
  }

  // basic rest operations

  public getAll() {
    const userId = this.storageService.getUser()._id;
    return this.http.get(`${this.apiEndpoint}/users/${userId}/threads`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public create(author: string, target: string, text: string) {
    return this.http.post(`${this.apiEndpoint}/threads`, { author, target, text }, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public update(threadId: string, lastMessage: string) {
    const userId = this.storageService.getUser()._id;
    return this.http.patch(`${this.apiEndpoint}/users/${userId}/threads/${threadId}`, { lastMessage }, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }
}
