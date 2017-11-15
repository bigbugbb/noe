import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { UserService, ProfileService, StorageService } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  public profile;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  public signout(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.userService.signout()
      .subscribe(() => {
        this.storageService.clear();
        // use the old way to avoid ngx-bootstrap refreshing bug
        window.location.href = '/auth';
      });
  }

  get username(): string {
    const user = this.storageService.getUser();
    switch (user.role) {
      case 'Student': {
        const firstname = this.profile.firstname || 'New';
        const lastname = this.profile.lastname || 'User';
        return `${firstname} ${lastname}`;
      }
      case 'School': {
        return this.profile.name || 'New school';
      }
      case 'Company': {
        return this.profile.name || 'New company';
      }
    }
  }

  get roleIsStudent(): boolean {
    const user = this.storageService.getUser();
    return user.role === 'Student';
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public navigateToProfile(event) {
    event.preventDefault();
    event.stopPropagation();

    const user = this.storageService.getUser();
    switch (user.role) {
      case 'Student': {
        return this.router.navigate(['/profile/student']);
      }
      case 'School': {
        return this.router.navigate(['/profile/school']);
      }
      case 'Company': {
        return this.router.navigate(['/profile/company']);
      }
      default: {
        console.error('Invalid user role', user.role);
      }
    }
  }
}
