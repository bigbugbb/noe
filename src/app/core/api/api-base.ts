import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { StorageService } from '@app/core/storage/storage.service';

export class ApiBase {
  protected headers: Headers;
  protected options: RequestOptions;

  protected constructor(protected storageService: StorageService) {
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  // private helper methods

  protected defaultHeaders(): Headers {
    return new Headers(this.headers);
  }

  protected headersWithJWT(headers: Headers): Headers {
    // create authorization header with jwt token
    let token = this.storageService.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  protected defaultOptions(): RequestOptions {
    return new RequestOptions(this.options);
  }

  protected optionsWithJWT(): RequestOptions {
    let headers = this.headersWithJWT(this.defaultHeaders());
    return new RequestOptions({ headers });
  }

  protected extractData(response: Response, index: number) {
    let body = response.json();
    return body || {};
  }

  protected handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}