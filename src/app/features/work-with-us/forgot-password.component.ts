import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '@app/core';

@Component({
  selector: 'noe-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild('f')
  private form: NgForm;

  private sent = false;
  private loading = false;

  constructor(
    private userService: UserService
  ) {}

  submit() {
    const { email } = this.form.value;
    this.loading = true;
    this.userService.forgotPassword(email).subscribe(() => {
      this.sent = true;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
