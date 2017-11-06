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

  public setStudentQueryParams(params) {
    this.setItem('students_query_params', params);
  }

  public getStudentQueryParams() {
    return this.getItem('students_query_params');
  }

  public removeStudentQueryParams() {
    this.removeItem('students_query_params');
  }

  public setSchoolQueryParams(params) {
    this.setItem('schools_query_params', params);
  }

  public getSchoolQueryParams() {
    return this.getItem('schools_query_params');
  }

  public removeSchoolQueryParams() {
    this.removeItem('schools_query_params');
  }

  public setActivityQueryParams(params) {
    this.setItem('activities_query_params', params);
  }

  public getActivityQueryParams() {
    return this.getItem('activities_query_params');
  }

  public removeActivityQueryParams() {
    this.removeItem('activities_query_params');
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

  public clear() {
    localStorage.clear();
  }
}
