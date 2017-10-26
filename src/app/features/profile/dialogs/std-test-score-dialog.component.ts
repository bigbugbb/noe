import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'noe-std-test-score-dialog',
  templateUrl: 'std-test-score-dialog.component.html',
  styleUrls: ['std-test-score-dialog.component.scss']
})
export class StdTestScoreDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public model: any;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // get profile and make a deep copy of it
    this.profileService.getProfile().subscribe(profile => this.model = JSON.parse(JSON.stringify(profile)));
  }

  public show() {
    this.dialog.show();
  }

  public onSubmit() {
    const user = this.storageService.getUser();
    this.profileService.updateProfile(user.role, this.model).subscribe(() => {
      this.dialog.hide();
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
