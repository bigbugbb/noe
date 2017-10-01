import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  signin(email: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiEndpoint}/users/login`, {email, password}, options)
      .map((response: Response) => {
        // login successfully if there's a jwt token in the response
        let user = response.json();
        let token = response.headers.get('x-auth');
        if (user && token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({user, token}));
        }

        return user;
      });
  }

  signup(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiEndpoint}/users`, user, options)
      .map((response: Response) => {
        // register successfully if there's a jwt token in the response
        let user = response.json();
        let token = response.headers.get('x-auth');
        if (user && token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({user, token}));
        }

        return user;
      });
  }

  signout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}