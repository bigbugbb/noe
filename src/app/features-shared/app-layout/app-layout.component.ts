import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { UserService } from '@app/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  public user: User;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = userService.currentUser().user;
  }

  ngOnInit(): void {}

  public signout(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.userService.signout()
      .subscribe(() => {
        console.log('login status has been reset');
        this.router.navigate(['/auth']);
      });
  }

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
