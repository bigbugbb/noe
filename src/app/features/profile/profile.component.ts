import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { IntroDialogComponent } from './dialogs';

import { ProfileService, StorageService } from '@app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('introDialog')
  private introDialog: IntroDialogComponent;

  public profile;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let user = this.storageService.getUser();
    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  public onEditIntro() {
    this.introDialog.show();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
