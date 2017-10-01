import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  public signout() {
    this.authenticationService.signout();
  }
}
