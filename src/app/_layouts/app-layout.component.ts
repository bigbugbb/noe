import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  public user: User;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(private userService: UserService) {
    this.user = userService.currentUser().user;
  }

  ngOnInit(): void {}

  public username(): string {
    const {firstname, lastname} = this.user;
    return `${firstname} ${lastname}`;
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
