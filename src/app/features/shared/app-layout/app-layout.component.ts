import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { UserService, StorageService } from '@app/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public signout(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.userService.signout()
      .subscribe(() => {
        this.router.navigate(['/auth']);
      });
  }

  public username(): string {
    let profile = this.storageService.getProfile();
    let firstname = profile.firstname || 'New';
    let lastname = profile.lastname || 'User'
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
