import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DialogComponent } from '@app/shared';
import { ProfileService, StorageService } from '@app/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'intro-dialog',
  templateUrl: 'intro-dialog.component.html',
  styleUrls: ['intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @Input()
  public editAdd = true;

  public bsConfig: Partial<BsDatepickerConfig>;
  public countries: Observable<object[]>;
  public educationLevels: Observable<string[]>;
  public loading = false;

  public model;

  constructor(
    private http: Http,
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-blue'});
    this.profileService.getProfile().subscribe(profile => this.model = profile);
    this.countries = this.http.get('@app/../assets/data/countries.json')
      .map((res: Response) => res.json());
    this.educationLevels = this.http.get('@app/../assets/data/education-levels.json')
      .map((res: Response) => res.json());
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