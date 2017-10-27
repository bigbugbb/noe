import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student-gender-filter',
  styles: [`
    .custom-control-input:focus~.custom-control-indicator {
      -webkit-box-shadow: 0 0 0 0px transparent, 0 0 0 0px transparent;
      box-shadow: 0 0 0 0px transparent, 0 0 0 0px transparent;
    }
  `],
  template: `
    <noe-collapse-filter class="item" [filterId]="'gender'" [title]="'Gender'">
      <div filter-body style="padding-top: 1rem;">
        <label *ngFor="let genderType of genderTypes" class="w-100 custom-control custom-radio">
          <input type="radio" class="custom-control-input"
                  name="gender"
                  value="{{ genderType.toLowerCase() }}"
                  (change)="filterChanged.emit()"
                  [ngModel]="getGender()"
                  required>
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{ genderType }}</span>
        </label>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GenderFilterComponent implements OnInit {
  @Input()
  private filters: { [key: string]: any };

  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private genderTypes = ['Male', 'Female'];

  ngOnInit() {
    console.log('gender', this.filters);
  }

  public getGender() {
    return _.get(this.filters, 'gender', '');
  }
}
