import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let user = this.storageService.getUser();
    this.profileService.fetchProfile(user).subscribe(profile => {
      this.storageService.setProfile(profile);
    });
  }

  public onEditIntro() {
    this.introDialog.show();
  }
}
