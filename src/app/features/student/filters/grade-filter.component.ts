import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'noe-grade-filter',
  styles: [`
    .custom-control-input:focus~.custom-control-indicator {
      -webkit-box-shadow: 0 0 0 0px transparent, 0 0 0 0px transparent;
      box-shadow: 0 0 0 0px transparent, 0 0 0 0px transparent;
    }
  `],
  template: `
    <noe-collapse-filter class="item" [filterId]="'grade'" [title]="'Current grade'">
      <div filter-body style="padding-top: 1rem;">
        <label *ngFor="let grade of grades | async" class="w-100 custom-control custom-radio">
          <input type="radio" class="custom-control-input"
                  name="grade"
                  value="{{ grade }}"
                  (change)="filterChanged.emit()"
                  ngModel
                  required>
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{ grade }}</span>
        </label>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GradeFilterComponent implements OnInit {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private grades: Observable<string[]>;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.grades = this.http.get('@app/../assets/data/grades.json').map((res: Response) => res.json());
  }
}
