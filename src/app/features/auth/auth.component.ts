import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '@app/core';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  modelSignin: any = {};
  modelSignup: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signup() {
    this.loading = true;
    this.userService.signup(this.modelSignup).subscribe(data => {
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
    const {email, password} = this.modelSignin;
    this.userService.signin(email, password).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
