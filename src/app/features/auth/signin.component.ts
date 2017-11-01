import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertService, UserService, ProfileService } from '@app/core';
import { User } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @Input()
  private returnUrl = '';

  @ViewChild('f')
  private form: NgForm;

  private loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private alertService: AlertService
  ) {}

  signin() {
    this.loading = true;
    const { email, password } = this.form.value;
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
