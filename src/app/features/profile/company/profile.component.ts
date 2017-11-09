import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { ProfileService, StorageService, CompanyService } from '@app/core';
import { Company } from '@app/models';
import { environment } from '@env/environment';
import * as Dialogs from './dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'noe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('introDialog')
  private introDialog: Dialogs.IntroDialogComponent;

  public profile = { businesses: [] };

  private fileBaseUrl: string;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;
    this.profileService.fetchProfile(user).subscribe(() => this.populateProfile());
  }

  private populateProfile() {
    this.profileService.getProfile().subscribe((profile: Company) => {
      _.assign(this.profile, profile);
      this.companyService.getById(profile._id).subscribe(result => {
        this.profile = result.company; // with activities and businesses populated
      });
    });
  }

  public fileUrlFrom(object) {
    return this.fileBaseUrl + '/' + object.Key;
  }

  public onEditIntro() {
    this.introDialog.show();
  }

  public trackByKey(index, item) {
    return item.Key;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
