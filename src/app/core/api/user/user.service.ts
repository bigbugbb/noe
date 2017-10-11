import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '@app/models';
import { environment } from '@env/environment';
import { StorageService } from '@app/core/storage/storage.service';
import 'rxjs/add/operator/map';

import { ApiBase } from '../api-base';

@Injectable()
export class UserService extends ApiBase {

  private apiEndpoint: String = environment.apiEndpoint;

  constructor(
    private http: Http,
    protected storageService: StorageService
  ) {
    super(storageService);
  }

  // basic rest operations

  public getAll() {
    return this.http.get(`${this.apiEndpoint}/users`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getById(id: string) {
    return this.http.get(`${this.apiEndpoint}/users/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public update(user: User) {
    return this.http.put(`${this.apiEndpoint}/users/${user._id}`, user, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(id: string) {
    return this.http.delete(`${this.apiEndpoint}/users/${id}`, this.optionsWithJWT())
      .map(this.extractData)
      .catch(this.handleError);
  }

  // authorization operations

  public signin(email: string, password: string) {
    return this.http.post(`${this.apiEndpoint}/users/login`, {email, password}, this.defaultOptions())
      .map((response: Response) => {
        // login successfully if there's a jwt token in the response
        let user = response.json();
        let token = response.headers.get('x-auth');
        if (user && token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.setUserAndToken(user, token);
        }
        return user;
      })
      .catch(this.handleError);
  }

  public signup(user: User) {
    return this.http.post(`${this.apiEndpoint}/users`, user, this.defaultOptions())
      .map((response: Response) => {
        // register successfully if there's a jwt token in the response
        let user = response.json();
        let token = response.headers.get('x-auth');
        if (user && token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.setUserAndToken(user, token);
        }
        return user;
      })
      .catch(this.handleError);
  }

  public signout() {
    let options = this.optionsWithJWT();

    // remove user from local storage to log user out
    this.storageService.removeUserAndToken();
    this.storageService.removeProfile();

    return this.http.delete(`${this.apiEndpoint}/users/me/token`, options)
      .catch(this.handleError);
  }
}