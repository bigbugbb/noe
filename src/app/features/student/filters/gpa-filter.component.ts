import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'noe-gpa-filter',
  styles: [`
    .hspace {
      display: block;
      width: 1rem;
    }

    .gpa-container {
      display: flex;
      flex-direction: row;
    }

    .update {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `],
  template: `
    <noe-collapse-filter ngModelGroup="gpa" class="item" [filterId]="'gpa'" [title]="'GPA'">
      <div filter-body style="padding: 1rem 2rem 0 0;">
        <div class="gpa-container w-100">
          <input type="number" class="form-control" id="min"
            name="min"
            value="0"
            placeholder="Min"
            (keyup.enter)="filterChanged.emit()"
            [ngModel]="getMin()"
            required>

          <span class="hspace"></span>

          <input type="number" class="form-control" id="max"
            name="max"
            value="100"
            placeholder="Max"
            (keyup.enter)="filterChanged.emit()"
            [ngModel]="getMax()"
            required>
        </div>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GpaFilterComponent {
  @Input()
  private filters: { [key: string]: any };

  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  public getMin() {
    return _.get(this.filters, 'gpa.min', 0);
  }

  public getMax() {
    return _.get(this.filters, 'gpa.max', 0);
  }
}

