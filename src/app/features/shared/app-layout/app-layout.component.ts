import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from '@app/models';
import { UserService, ProfileService, ChatService, StorageService, ChatUIService } from '@app/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

declare var FB;

@Component({
  selector: 'noe-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  private profile;
  private messagesNotRead: Number = 0;
  private disabled = false;
  private status: {isopen: boolean} = {isopen: false};

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private chatService: ChatService,
    private chatUIService: ChatUIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chatService.connect();
    this.chatService.messagesNotRead$.subscribe(value => this.messagesNotRead = value);
    this.profileService.getProfile().subscribe(value => this.profile = value);
    this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) { return; }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  public signout(event): void {
    event.preventDefault();
    this.userService.signout().subscribe(() => {
      FB.logout();
      this.storageService.clear();
      setTimeout(() => window.location.href = '/', 0);
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

  public toggleThreadList(event) {
    this.chatUIService.toggleThreadList();
    event.preventDefault();
  }

  public profileLink() {
    const user = this.storageService.getUser();
    return '/profile/' + user.role.toLocaleLowerCase();
  }
}
