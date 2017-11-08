import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '@app/core';
import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['../shared-styles.component.scss', './business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  private businesses: Business[] = [];

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.businesses = _.get(profile, 'businesses', []);
    });
  }

  public createBusiness() {
    console.log('create business');
  }

  public showDivider(index) {
    return index !== this.businesses.length - 1;
  }
}
