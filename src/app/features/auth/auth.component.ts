import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '@app/models';
import { AlertService, UserService, ProfileService, StorageService } from '@app/core';

import * as _ from "lodash";

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public modelSignin: any = {};
  public modelSignup: any = {};
  public roles = ['student', 'school', 'company'];
  public loading = false;
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signup() {
    this.loading = true;
    this.userService.signup(this.modelSignup).flatMap((user: User) => {
      // create a new user profile based on the user role
      const data = _.pick(this.modelSignup, ['email', 'phone', 'firstname', 'lastname']);
      data['userId'] = user._id;
      return this.profileService.createProfile(this.modelSignup.role, data);
    }).subscribe(profile => {
      // set profile data so the top-right dropdown area can display correctly
      this.storageService.setProfile(profile);
      // set success message and pass true paramater to persist the message after redirecting to the login page
      this.alertService.success('Signup successful', true);
      this.router.navigate(['/']);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }

  signin() {
    this.loading = true;
    const { email, password } = this.modelSignin;
    this.userService.signin(email, password).flatMap((user: User) => {
      return this.profileService.fetchProfile(user);
    }).subscribe(profile => {
      // set profile data so the top-right dropdown area can display correctly
      this.storageService.setProfile(profile);
      // redirect to the wanted page
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
