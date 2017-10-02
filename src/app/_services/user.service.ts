import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  private apiEndpoint: String = environment.apiEndpoint;

  constructor(private http: Http) { }

  // basic rest operations

  public getAll() {
    return this.http.get(`${this.apiEndpoint}/users`, this.jwtToken()).map((response: Response) => response.json());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiEndpoint}/users/${id}`, this.jwtToken()).map((response: Response) => response.json());
  }

  public update(user: User) {
    return this.http.put(`${this.apiEndpoint}/users/${user.id}`, user, this.jwtToken()).map((response: Response) => response.json());
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiEndpoint}/users/${id}`, this.jwtToken()).map((response: Response) => response.json());
  }

  // authenticate operations

  public signin(email: string, password: string) {
    return this.http.post(`${this.apiEndpoint}/users/login`, {email, password}, this.jsonType())
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

  public signup(user: User) {
    return this.http.post(`${this.apiEndpoint}/users`, user, this.jsonType())
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

  public signout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  // utils methods

  public currentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  // private helper methods

  private jsonType() {
    let headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers});
  }

  private jwtToken() {
    // create authorization header with jwt token
    let currentUser = this.currentUser();
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': `Bearer ${currentUser.token}`});
      return new RequestOptions({headers});
    }
  }
}