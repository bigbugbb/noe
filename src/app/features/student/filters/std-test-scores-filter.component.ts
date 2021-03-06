import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-std-test-scores-filter',
  styleUrls: ['./filter-common-styles.scss'],
  template: `
    <noe-collapse-filter class="item" [filterId]="'stdTestScores'" [title]="'Standard test scores'">
      <div filter-body style="padding: 1rem 2rem 0 0;">
        <label *ngFor="let stdTest of stdTests | async;"
                ngModelGroup="{{ stdTest.key }}"
                class="w-100 custom-control custom-checkbox filter-text">
          <noe-std-test-score-range
                  [stdTest]="stdTest"
                  [range]="range(stdTest)"
                  (rangeChanged)="filterChanged.emit()">
          </noe-std-test-score-range>
        </label>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class StdTestScoreFilterComponent implements OnInit {
  @Input()
  private filters: { [key: string]: any };

  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private stdTests;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.stdTests = this.http.get('@app/../assets/data/std-tests.json').map((res: Response) => res.json());
  }

  public range(stdTest) {
    return _.get(this.filters, [stdTest.key]);
  }
}
