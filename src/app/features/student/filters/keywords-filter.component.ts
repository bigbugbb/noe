import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'noe-student-keywords-filter',
  styles: [`
    .vspace {
      display: block;
      height: 0.6rem;
    }

    .update {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `],
  template: `
    <noe-collapse-filter class="item" [filterId]="'keywords'" [title]="'Keywords'">
      <div filter-body style="padding: 1rem 2rem 0 0">
        <div *ngFor="let keyword of keywords;">
          <label for="{{ keyword }}">{{ keyword | capitalize }}</label>
          <input type="text" class="form-control" id="{{ keyword }}"
                  name="{{ keyword }}"
                  (keyup.enter)="filterChanged.emit()"
                  [ngModel]="getKeyword(keyword)"
                  required>
          <span class="vspace"></span>
        </div>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class KeywordsFilterComponent {
  @Input()
  private filters: { [key: string]: any };

  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private keywords = ['firstname', 'lastname', 'email', 'school'];

  public getKeyword(keyword) {
    return _.get(this.filters, [keyword], '');
  }
}
