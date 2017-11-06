import { Component, Input } from '@angular/core';

import { Activity } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent {
  @Input()
  private item: Activity;

  @Input()
  private showDivider = true;

  get activityName() {
    return this.item.name;
  }
}
