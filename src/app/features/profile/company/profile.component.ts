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

  public profile;

  private tabNames = ['My Businesses', 'Customer Orders'];
  private selectedTab = 0;

  private fileBaseUrl: string;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    // this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;
    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  public selectTab(target: Number | string) {
    this.selectedTab = Math.max(_.isNumber(target) ? target : _.findIndex(this.tabNames, target), 0);
  }

  public isTabSelected(i) {
    return this.selectedTab === i;
  }

  get email() {
    return _.get(this.profile, 'email', 'Not provided');
  }

  get phone() {
    return _.get(this.profile, 'phone', 'Not provided');
  }

  get ein() {
    return _.get(this.profile, 'ein', 'Not provided');
  }

  get street() {
    return _.get(this.profile, 'street', 'Not provided');
  }

  get city() {
    return _.get(this.profile, 'city', 'Not provided');
  }

  get state() {
    return _.get(this.profile, 'state', 'Not provided');
  }

  get zipcode() {
    return _.get(this.profile, 'zipcode', 'Not provided');
  }

  get country() {
    return _.get(this.profile, 'country', 'Not provided');
  }

  get introduction() {
    return _.get(this.profile, 'introduction', 'Not provided');
  }

  public onEditIntro() {
    this.introDialog.show();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
