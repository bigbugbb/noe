import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-skill-edit-dialog',
  templateUrl: 'skill-edit-dialog.component.html',
  styleUrls: ['skill-edit-dialog.component.scss']
})
export class SkillEditDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public edited = false;
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

  public removeSkill(event, skillToRemove) {
    event.preventDefault();
    event.stopPropagation();

    this.skills = this.skills.filter(skill => skill !== skillToRemove);
    this.edited = true;
  }

  public show() {
    this.edited = false;
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