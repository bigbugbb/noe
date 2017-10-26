import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'skill-add-dialog',
  templateUrl: 'skill-add-dialog.component.html',
  styleUrls: ['skill-add-dialog.component.scss']
})
export class SkillAddDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public added = false;
  public newSkill = '';
  public model;
  public skills: Array<string>;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // get profile and make a deep copy of it
    this.profileService.getProfile().subscribe(profile => {
      this.model = JSON.parse(JSON.stringify(profile));
      this.skills = JSON.parse(JSON.stringify(this.model.skills));
    });
  }

  public addNewSkill(event) {
    event.preventDefault();
    event.stopPropagation();

    this.newSkill = this.newSkill.trim();
    if (!_.isEmpty(this.newSkill)) {
      const oldSize = this.skills.length;
      this.skills.push(this.newSkill);
      this.skills = _.uniq(this.skills);
      this.newSkill = '';
      this.added = this.added || oldSize < this.skills.length;
    }
  }

  public show() {
    this.added = false;
    this.newSkill = '';
    this.skills = JSON.parse(JSON.stringify(this.model.skills));
    this.dialog.show();
  }

  public onSave() {
    const user = this.storageService.getUser();
    this.model.skills = this.skills;
    this.profileService.updateProfile(user.role, this.model).subscribe(() => {
      this.dialog.hide();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}