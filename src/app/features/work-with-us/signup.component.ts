import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertService, UserService, ProfileService } from '@app/core';
import { User } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('f')
  private form: NgForm;

  private roles = ['School', 'Company'];
  private loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private alertService: AlertService
  ) {}

  signup() {
    this.loading = true;
    this.userService.signup(this.form.value).subscribe((user: User) => {
      this.profileService.setProfile(JSON.stringify(user.profile));
      window.location.href = '/home';
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
