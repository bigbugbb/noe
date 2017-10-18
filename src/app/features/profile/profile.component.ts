import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { ProfileService, StorageService, ApplicationChecklistService } from '@app/core';
import { environment } from '@env/environment';
import * as Dialogs from './dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('introDialog')
  private introDialog: Dialogs.IntroDialogComponent;

  @ViewChild('schoolPreferredDialog')
  private schoolPreferredDialog: Dialogs.SchoolPreferredDialogComponent;

  @ViewChild('skillAddDialog')
  private skillAddDialog: Dialogs.SkillAddDialogComponent;

  @ViewChild('skillEditDialog')
  private skillEditDialog: Dialogs.SkillEditDialogComponent;

  @ViewChild('interestAddDialog')
  private interestAddDialog: Dialogs.InterestAddDialogComponent;

  @ViewChild('interestEditDialog')
  private interestEditDialog: Dialogs.InterestEditDialogComponent;

  @ViewChild('passportScanEditDialog')
  private passportScanEditDialog: Dialogs.PassportScanEditDialogComponent;

  public profile;
  public passportScans;

  private fileBaseUrl: string;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private applicationChecklistService: ApplicationChecklistService
  ) { }

  ngOnInit() {
    let user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.amazonaws.com/${environment.noeFilesUpload}`;
    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
    this.applicationChecklistService.fetchPassportScans().subscribe();
    this.applicationChecklistService.getPassportScans().subscribe(passportScans => this.passportScans = passportScans);
  }

  get hasSkills() {
    return !_.isEmpty(this.profile.skills);
  }

  get hasInterests() {
    return !_.isEmpty(this.profile.interests);
  }

  get hasPassportScans() {
    return !_.isEmpty(this.passportScans);
  }

  public fileUrlFrom(object) {
    return this.fileBaseUrl + '/' + object.Key;
  }

  public onEditIntro() {
    this.introDialog.show();
  }

  public onEditSchoolPreferred() {
    this.schoolPreferredDialog.show();
  }

  public onAddNewSkill() {
    this.skillAddDialog.show();
  }

  public onEditSkills() {
    this.skillEditDialog.show();
  }

  public onAddNewInterest() {
    this.interestAddDialog.show();
  }

  public onEditInterests() {
    this.interestEditDialog.show();
  }

  public onEditPassportScans() {
    this.passportScanEditDialog.show();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
