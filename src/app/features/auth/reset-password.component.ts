import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService, ProfileService } from '@app/core';
import { User } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('f')
  private form: NgForm;

  private token: string;

  private different = false;
  private sent = false;
  private loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.token = _.get(this.route.snapshot.params, 'token', '');
  }

  submit() {
    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.different = true;
      return;
    }

    this.loading = true;
    this.userService.resetPassword(password, this.token).subscribe((user: User) => {
      this.profileService.setProfile(user.profile);
      this.router.navigate(['/']);
    }, error => {
      this.loading = false;
    });
  }
}
