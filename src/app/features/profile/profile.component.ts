import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { ProfileService, StorageService } from '@app/core';
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

  get hasSkills() {
    return !_.isEmpty(this.profile.skills);
  }

  get hasInterests() {
    return !_.isEmpty(this.profile.interests);
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

  public onAddTravalDoc() {
    console.log('onAddTravalDoc');
  }

  public onEditTravalDoc() {
    console.log('onEditTravalDoc');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
