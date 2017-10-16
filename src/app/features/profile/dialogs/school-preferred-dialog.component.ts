import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'school-preferred-dialog',
  templateUrl: 'school-preferred-dialog.component.html',
  styleUrls: ['school-preferred-dialog.component.scss']
})
export class SchoolPreferredDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  public types: Observable<string[]>;
  public states: Observable<object[]>;
  public religions: Observable<string[]>;
  public accommodations: Observable<string[]>;
  public model: any;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // get profile and make a deep copy of it
    this.profileService.getProfile().subscribe(profile => this.model = JSON.parse(JSON.stringify(profile)));

    // load static resources for input tag
    this.types = this.http.get('@app/../assets/data/school-types.json').map((res: Response) => res.json());
    this.states = this.http.get('@app/../assets/data/us-states.json').map((res: Response) => res.json());
    this.religions = this.http.get('@app/../assets/data/religions.json').map((res: Response) => res.json());
    this.accommodations = this.http.get('@app/../assets/data/accommodations.json').map((res: Response) => res.json());
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