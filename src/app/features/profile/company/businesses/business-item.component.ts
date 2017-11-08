import { Component, Input } from '@angular/core';

import { Business } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-item',
  templateUrl: './business-item.component.html',
  styleUrls: ['./business-item.component.scss']
})
export class BusinessItemComponent {
  @Input()
  private item: Business;

  @Input()
  private showDivider = true;
}
