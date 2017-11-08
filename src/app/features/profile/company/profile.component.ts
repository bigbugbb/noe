import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  public profile;

  private fileBaseUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private storageService: StorageService,
    private applyingFileService: ApplyingFileService
  ) { }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;

    this.profileService.fetchProfile(user).subscribe();
    this.profileService.getProfile().subscribe(profile => this.profile = profile);
  }

  public showActivities() {
    this.router.navigate(['./activities'], { relativeTo: this.route });
  }

  public showServices() {
    this.router.navigate(['./businesses'], { relativeTo: this.route });
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
