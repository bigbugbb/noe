import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'interest-add-dialog',
  templateUrl: 'interest-add-dialog.component.html',
  styleUrls: ['interest-add-dialog.component.scss']
})
export class InterestAddDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public added: Boolean = false;
  public newInterest: string = "";
  public model: any;
  public interests: Array<string>;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // get profile and make a deep copy of it
    this.profileService.getProfile().subscribe(profile => {
      this.model = JSON.parse(JSON.stringify(profile));
      this.interests = JSON.parse(JSON.stringify(this.model.interests));
    });
  }

  public addNewInterest(event) {
    event.preventDefault();
    event.stopPropagation();

    this.newInterest = this.newInterest.trim();
    if (!_.isEmpty(this.newInterest)) {
      let oldSize = this.interests.length;
      this.interests.push(this.newInterest);
      this.interests = _.uniq(this.interests);
      this.newInterest = "";
      this.added = this.added || oldSize < this.interests.length;
    }
  }

  public show() {
    this.added = false;
    this.newInterest = "";
    this.interests = JSON.parse(JSON.stringify(this.model.interests));
    this.dialog.show();
  }

  public onSave() {
    const user = this.storageService.getUser();
    this.model.interests = this.interests;
    this.profileService.updateProfile(user.role, this.model).subscribe(() => {
      this.dialog.hide();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}