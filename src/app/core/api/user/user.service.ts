import { Injectable, TemplateRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ApiBase } from '../api-base';
import { User } from '@app/models';
import { environment } from '@env/environment';
import { StorageService } from '@app/core/storage/storage.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends ApiBase {

  private apiEndpoint: string = environment.apiEndpoint;

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
    return this.http.post(`${this.apiEndpoint}/users/login`, { email, password }, this.defaultOptions())
      .map(this.handleAuthorized.bind(this))
      .catch(this.handleError);
  }

  public signup(user: User) {
    return this.http.post(`${this.apiEndpoint}/users`, user, this.defaultOptions())
      .map(this.handleAuthorized.bind(this))
      .catch(this.handleError);
  }

  private handleAuthorized(response: Response) {
    const user = response.json();
    const token = response.headers.get('x-auth');
    if (user && token) {
      this.storageService.setUserAndToken(user, token);
    }
    return user;
  }

  public signout() {
    const options = this.optionsWithJWT();

    // remove user from local storage to log user out
    this.storageService.removeUserAndToken();
    this.storageService.removeProfile();

    // remove other application data
    this.storageService.removeStudentQueryParams();

    return this.http.delete(`${this.apiEndpoint}/users/me/token`, options)
      .catch(this.handleError);
  }

  // forgot & reset password

  public forgotPassword(email: string) {
    return this.http.post(`${this.apiEndpoint}/users/forgot-password`, { email }, this.defaultOptions())
      .catch(this.handleError);
  }

  public resetPassword(password: string, token: string) {
    return this.http.post(`${this.apiEndpoint}/users/reset-password/${token}`, { password }, this.defaultOptions())
      .map(this.handleAuthorized.bind(this))
      .catch(this.handleError);
  }
}
