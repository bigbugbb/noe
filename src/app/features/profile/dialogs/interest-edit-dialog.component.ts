import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'interest-edit-dialog',
  templateUrl: 'interest-edit-dialog.component.html',
  styleUrls: ['interest-edit-dialog.component.scss']
})
export class InterestEditDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public edited: Boolean = false;
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

  public removeInterest(event, interestToRemove) {
    event.preventDefault();
    event.stopPropagation();

    this.interests = this.interests.filter(skill => skill !== interestToRemove);
    this.edited = true;
  }

  public show() {
    this.edited = false;
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

  public trackByKey(index, item) {
    return item.Key;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}