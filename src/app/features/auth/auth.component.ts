import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '@app/models';
import { AlertService, UserService, ProfileService, StorageService } from '@app/core';
import * as _ from 'lodash';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public modelSignin: any = {};
  public modelSignup: any = {};
  public roles = ['Student', 'School', 'Company'];
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
    this.userService.signup(this.modelSignup).subscribe((user: User) => {
      this.profileService.setProfile(user.profile);
      this.router.navigate(['/']);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }

  signin() {
    this.loading = true;
    const { email, password } = this.modelSignin;
    this.userService.signin(email, password).subscribe((user: User) => {
      this.profileService.setProfile(user.profile);
      // redirect to the wanted page
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
