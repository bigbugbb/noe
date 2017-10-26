import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'noe-std-test-scores-filter',
  styles: [`
    .space {
      display:block;
      height: 0.6rem;
    }
  `],
  template: `
    <noe-collapse-filter class="item" [filterId]="'stdTestScores'" [title]="'Standard test scores'">
      <div filter-body style="padding: 1rem 2rem 0 0;">
        <label *ngFor="let stdTest of stdTests | async;"
                ngModelGroup="{{ stdTest }}"
                class="w-100 custom-control custom-checkbox">
          <noe-std-test-score-range [stdTest]="stdTest"></noe-std-test-score-range>
        </label>

        <span class="space"></span>

        <div style="display: flex; flex-direction: row; justify-content: flex-end;">
          <button class="btn btn-sm btn-primary" (click)="filterChanged.emit()">Update</button>
        </div>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class StdTestScoreFilterComponent implements OnInit {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private stdTests: Observable<string>;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.stdTests = this.http.get('@app/../assets/data/std-tests.json').map((res: Response) => res.json());
  }
}
