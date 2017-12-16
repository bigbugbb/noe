import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { UserService, ProfileService, ChatService, StorageService } from '@app/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'noe-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  private profile;
  private subProfile;
  private disabled = false;
  private status: {isopen: boolean} = {isopen: false};

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chatService.connect();
    this.subProfile = this.profileService.getProfile().subscribe(value => this.profile = value);
  }

  ngOnDestroy() {
    this.subProfile.unsubscribe();
    this.chatService.disconnect();
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
    const role: string = _.get(user, 'role', '');
    return role === 'Student';
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public profileLink() {
    const user = this.storageService.getUser();
    return '/profile/' + user.role.toLocaleLowerCase();
  }
}
