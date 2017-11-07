import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

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
  private passportScanEditDialog: Dialogs.PassportScanEditDialogComponent;

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

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private applyingFileService: ApplyingFileService
  ) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;

    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);

    const Types = ApplyingFileService.ApplyingFileTypes;

    this.applyingFileService.fetchApplyingFiles(Types.PassportScans).subscribe(passportScans => {
      this.passportScans = passportScans;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Recommendations).subscribe(recommendations => {
      this.recommendations = recommendations;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Transcripts).subscribe(transcripts => {
      this.transcripts = transcripts;
    });

    this.applyingFileService.fetchApplyingFiles(Types.FiancialInfo).subscribe(financialInfoDocs => {
      this.financialInfoDocs = financialInfoDocs;
    });

    this.applyingFileService.fetchApplyingFiles(Types.Supplements).subscribe(supplements => {
      this.supplements = supplements;
    });

    this.applyingFileService.fetchApplyingFiles(Types.OptionalMaterials).subscribe(optionalMaterials => {
      this.optionalMaterials = optionalMaterials;
    });
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
    return this.fileBaseUrl + '/' + object.Key;
  }

  public filenameFrom(object) {
    return object.Key.split('/').pop();
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