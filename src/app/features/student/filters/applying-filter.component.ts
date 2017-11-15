import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student-applying-filter',
  styleUrls: ['./filter-common-styles.scss'],
  template: `
    <noe-collapse-filter class="item" [filterId]="'applying'" [title]="'Applying'">
      <div filter-body class="pt-3">
        <label *ngFor="let grade of grades | async" class="w-100 custom-control custom-radio filter-text">
          <input type="radio" class="custom-control-input"
                  name="applying"
                  value="{{ grade }}"
                  (change)="filterChanged.emit()"
                  [ngModel]="getApplying()">
          <span class="custom-control-indicator border"></span>
          <span class="custom-control-description">{{ grade }}</span>
        </label>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ApplyingFilterComponent implements OnInit {
  @Input()
  private filters: { [key: string]: any };

  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private grades: Observable<string[]>;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.grades = this.http.get('@app/../assets/data/grades.json').map((res: Response) => res.json());
  }

  public getApplying() {
    return _.get(this.filters, 'applying', '');
  }
}
