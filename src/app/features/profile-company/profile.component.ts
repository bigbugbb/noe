import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { ProfileService, StorageService, ApplyingFileService } from '@app/core';
import { environment } from '@env/environment';
import * as _ from 'lodash';

@Component({
  selector: 'noe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile;
  private fileBaseUrl: string;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;

    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
