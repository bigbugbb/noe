import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { UserService, ProfileService, StorageService } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-layout',
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
        this.router.navigate(['/auth']);
        this.storageService.clear();
      });
  }

  get username(): string {
    const firstname = this.profile.firstname || 'New';
    const lastname = this.profile.lastname || 'User';
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
