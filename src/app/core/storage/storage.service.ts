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
    let userAndToken = JSON.parse(localStorage.getItem('user_and_token'));
    return userAndToken ? userAndToken.user : null;
  }

  public getToken(): string {
    let userAndToken = JSON.parse(localStorage.getItem('user_and_token'));
    return userAndToken ? userAndToken.token : null;
  }

  public removeUserAndToken() {
    localStorage.removeItem('user_and_token');
  }

  public setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public removeProfile() {
    localStorage.removeItem('profile');
  }
}