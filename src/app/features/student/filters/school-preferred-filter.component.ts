import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-school-preferred-filter',
  templateUrl: './school-preferred-filter.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SchoolPreferredFilterComponent implements OnInit {
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
