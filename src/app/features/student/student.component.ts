import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import * as _ from 'lodash';

@Component({
  selector: 'noe-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild('filterForm')
  private filterForm: NgForm;

  private sub: Subscription;

  private queryParams = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.queryParams = params || {};
      console.log(this.queryParams);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterChanged() {
    const queryParams = {};

    _.forOwn(this.filterForm.value, (value, key) => {
      if (!_.isEmpty(value)) {
        key = key.replace(/-+/g, '').toLocaleLowerCase();
        if (_.isObject(value)) {
          if (key === 'gpa' || value['checked']) {
            const omitList = ['checked'];
            _.forOwn(value, (subValue, subKey) => {
              if (!_.isNumber(subValue) && _.isEmpty(subValue)) {
                omitList.push(subKey);
              }
            });
            value = _.omit(value, omitList);
            if (!_.isEmpty(value)) {
              queryParams[key] = JSON.stringify(value);
            }
          }
        } else {
          queryParams[key] = value;
        }
      }
    });

    this.router.navigate(['/students'], { queryParams });
  }
}
