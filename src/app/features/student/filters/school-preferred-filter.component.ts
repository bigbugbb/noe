import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-school-preferred-filter',
  styles: [`
    .space {
      display:block;
      height: 0.6rem;
    }
  `],
  template: `
    <app-collapse-filter class="item" [filterId]="'schoolPreferred'" [title]="'School preferred'">
      <div filter-body style="padding: 1rem 2rem 0 0">
        <label for="preferredSchoolLocation">Location</label>
        <select class="form-control" id="preferredSchoolLocation"
                name="preferredSchoolLocation"
                (change)="filterChanged.emit()"
                ngModel
                required>
          <option *ngFor="let state of states | async" [value]="state.name">{{state.name}}</option>
        </select>

        <span class="space"></span>

        <label for="preferredSchoolType">Type</label>
        <select class="form-control" id="preferredSchoolType"
                name="preferredSchoolType"
                (change)="filterChanged.emit()"
                ngModel
                required>
          <option *ngFor="let type of types | async" [value]="type">{{type}}</option>
        </select>

        <span class="space"></span>

        <label for="preferredReligion">Religion</label>
        <select class="form-control" id="preferredReligion"
                name="preferredReligion"
                (change)="filterChanged.emit()"
                ngModel
                required>
          <option *ngFor="let religion of religions | async" [value]="religion">{{religion}}</option>
        </select>

        <span class="space"></span>

        <label for="preferredAccommodation">Accommodation</label>
        <select class="form-control" id="preferredAccommodation"
                name="preferredAccommodation"
                (change)="filterChanged.emit()"
                ngModel
                required>
          <option *ngFor="let accommodation of accommodations | async" [value]="accommodation">{{accommodation}}</option>
        </select>
      </div>
    </app-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SchoolPreferredFilterComponent implements OnInit {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  public types: Observable<string[]>;
  public states: Observable<object[]>;
  public religions: Observable<string[]>;
  public accommodations: Observable<string[]>;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.types = this.http.get('@app/../assets/data/school-types.json').map((res: Response) => res.json());
    this.states = this.http.get('@app/../assets/data/us-states.json').map((res: Response) => res.json());
    this.religions = this.http.get('@app/../assets/data/religions.json').map((res: Response) => res.json());
    this.accommodations = this.http.get('@app/../assets/data/accommodations.json').map((res: Response) => res.json());
  }
}
