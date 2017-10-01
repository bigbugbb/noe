import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/index';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get(`${environment.apiEndpoint}/users`).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(`${environment.apiEndpoint}/users/${id}`).map((response: Response) => response.json());
  }

  create(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiEndpoint}/users`, user, options)
      .map((response: Response) => {
        console.log(response);
        return response.json()
      });
  }

  update(user: User) {
    return this.http.put(`${environment.apiEndpoint}/users/${user.id}`, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiEndpoint}/users/${id}`, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': `Bearer ${currentUser.token}`});
      return new RequestOptions({headers});
    }
  }
}