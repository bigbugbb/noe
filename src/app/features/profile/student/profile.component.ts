import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ProfileService, StorageService, ApplyingFileService } from '@app/core';
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

  @ViewChild('stdTestScoreDialog')
  private stdTestScoreDialog: Dialogs.StdTestScoreDialogComponent;

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
  private passportScanEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  @ViewChild('recommendationEditDialog')
  private recommendationEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  @ViewChild('transcriptEditDialog')
  private transcriptEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  @ViewChild('financialInfoDocEditDialog')
  private financialInfoDocEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  @ViewChild('supplementEditDialog')
  private supplementEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  @ViewChild('optionalMaterialEditDialog')
  private optionalMaterilaEditDialog: Dialogs.ApplyingFileEditDialogComponent;

  public profile;
  public passportScans;
  public recommendations;
  public transcripts;
  public financialInfoDocs;
  public supplements;
  public optionalMaterials;

  private fileBaseUrl: string;

  private tabNames = ['About Myself', 'My Orders'];
  private selectedTab = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private storageService: StorageService,
    private applyingFileService: ApplyingFileService
  ) {}

  ngOnInit() {
    this.selectTab(1);

    const user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;

    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);

    const Types = ApplyingFileService.ApplyingFileTypes;

    this.applyingFileService.fetchApplyingFiles(Types.PassportScans).subscribe();
    this.applyingFileService.getApplyingFiles(Types.PassportScans).subscribe(passportScans => {
      this.passportScans = passportScans;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Recommendations).subscribe();
    this.applyingFileService.getApplyingFiles(Types.Recommendations).subscribe(recommendations => {
      this.recommendations = recommendations;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Transcripts).subscribe();
    this.applyingFileService.getApplyingFiles(Types.Transcripts).subscribe(transcripts => {
      this.transcripts = transcripts;
    });

    this.applyingFileService.fetchApplyingFiles(Types.FiancialInfo).subscribe();
    this.applyingFileService.getApplyingFiles(Types.FiancialInfo).subscribe(financialInfoDocs => {
      this.financialInfoDocs = financialInfoDocs;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Supplements).subscribe();
    this.applyingFileService.getApplyingFiles(Types.Supplements).subscribe(supplements => {
      this.supplements = supplements;
    });

    this.applyingFileService.fetchApplyingFiles(Types.OptionalMaterials).subscribe();
    this.applyingFileService.getApplyingFiles(Types.OptionalMaterials).subscribe(optionalMaterials => {
      this.optionalMaterials = optionalMaterials;
    });
  }

  public selectTab(target: Number | string) {
    this.selectedTab = Math.max(_.isNumber(target) ? target : _.findIndex(this.tabNames, target), 0);
  }

  public isTabSelected(i) {
    return this.selectedTab === i;
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

  get hasRecommendations() {
    return !_.isEmpty(this.recommendations);
  }

  get hasTranscripts() {
    return !_.isEmpty(this.transcripts);
  }

  get hasFinancialInfoDocs() {
    return !_.isEmpty(this.financialInfoDocs);
  }

  get hasSupplements() {
    return !_.isEmpty(this.supplements);
  }

  get hasOptionalMaterials() {
    return !_.isEmpty(this.optionalMaterials);
  }

  public fileUrlFrom(object) {
    return this.fileBaseUrl + '/' + encodeURIComponent(object.Key);
  }

  public nameOfApplyingFile(object) {
    return decodeURIComponent(object.Key.split('/').pop());
  }

  public onEditIntro() {
    this.introDialog.show();
  }

  public onEditStdTestScores() {
    this.stdTestScoreDialog.show();
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

  public onEditRecommendLetters() {
    this.recommendationEditDialog.show();
  }

  public onEditTranscripts() {
    this.transcriptEditDialog.show();
  }

  public onEditFinancialInfoDocs() {
    this.financialInfoDocEditDialog.show();
  }

  public onEditSupplements() {
    this.supplementEditDialog.show();
  }

  public onEditOptionalMaterial() {
    this.optionalMaterilaEditDialog.show();
  }

  public trackByKey(index, item) {
    return item.Key;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.profile); }
}
