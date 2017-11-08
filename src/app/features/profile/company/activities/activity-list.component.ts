import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '@app/core';
import { Activity } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['../shared-styles.component.scss', './activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  private activities: Activity[] = [];

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.activities = _.get(profile, 'activities', []);
    });
  }

  public createActivity() {
    console.log('create activity');
  }

  public showDivider(index) {
    return index !== this.activities.length - 1;
  }
}
