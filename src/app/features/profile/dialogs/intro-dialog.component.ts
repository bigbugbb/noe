import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DialogComponent } from '@app/shared';
import { ProfileService } from '@app/core';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  public countries = [];
  public loading = false;

  public model;

  constructor(
    private http: Http,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.model = this.profileService.getProfile();
    this.bsConfig = Object.assign({}, {containerClass: 'theme-blue'});
    this.http.get('@app/../assets/data/countries.json').subscribe((res: Response) => {
      this.countries = res.json()
    });
  }

  public show() {
    this.dialog.show();
  }

  public delete() {
    this.dialog.hide();
  }

  public save() {
    this.dialog.hide();
  }
}