import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  template: `
    <div>
      <button (click)="signout()">Signout</button>
    </div>
  `,
  styleUrls: ['./auth.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    // reset login status
  }

  signout() {
    this.authenticationService.signout();
    this.router.navigate(['/']);
  }
}