import { Injectable } from '@angular/core';

import { User } from '@app/models';

@Injectable()
export class StorageService {

  constructor() {}

  public setUserAndToken(user, token) {
    localStorage.setItem('user_and_token', JSON.stringify({user, token}));
  }

  public getUserAndToken() {
    return JSON.parse(localStorage.getItem('user_and_token'));
  }

  public getUser(): User {
    const userAndToken = JSON.parse(localStorage.getItem('user_and_token'));
    return userAndToken ? userAndToken.user : null;
  }

  public getToken(): string {
    const userAndToken = JSON.parse(localStorage.getItem('user_and_token'));
    return userAndToken ? userAndToken.token : null;
  }

  public removeUserAndToken() {
    localStorage.removeItem('user_and_token');
  }

  public setProfile(profile) {
    this.setItem('profile', profile);
  }

  public getProfile() {
    return this.getItem('profile');
  }

  public removeProfile() {
    this.removeItem('profile');
  }

  public setItem(name, item) {
    localStorage.setItem(name, JSON.stringify(item));
  }

  public getItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  public removeItem(name) {
    localStorage.removeItem(name);
  }
}
