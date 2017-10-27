import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { StudentService, StorageService } from '@app/core';
import { Student } from '@app/models';
import * as _ from 'lodash';

@Component({
  selector: 'noe-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild('filterForm')
  private filterForm: NgForm;

  private filters: { [key: string]: any };

  private sub: Subscription;

  private students: Student[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private studentService: StudentService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.cacheQueryParams(queryParams);
      this.searchStudents(queryParams);
    });

    this.http.get('@app/../assets/data/params.json').subscribe(res => {
      this.filters = res.json();
      const params = this.storageService.getItem('student_query_params') || {};
      _.assign(this.filters, params);
      console.log(this.filters);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private searchStudents(queryParams) {
    this.studentService.getAll(queryParams).subscribe(result => {
      this.students = result.students;
    });
  }

  private cacheQueryParams(queryParams) {
    let params = {};

    try {
      params = _.first(JSON.parse(queryParams.params));
    } catch (err) {
      console.log(err);
    }
    this.storageService.setItem('student_query_params', params);
  }

  onFilterChanged() {
    const params = {};

    _.forOwn(this.filterForm.value, (value, key) => {
      value = _.isString(value) ? value.trim() : value;
      if (!_.isEmpty(value)) {
        key = key.replace(/-+/g, '');
        if (_.isObject(value)) {
          if (key === 'gpa' || value['checked']) {
            const omits = ['checked'];
            _.forOwn(value, (subValue, subKey) => {
              if (!_.isNumber(subValue) && _.isEmpty(subValue)) {
                omits.push(subKey);
              }
            });
            value = _.omit(value, omits);
            if (!_.isEmpty(value)) {
              params[key] = value;
            }
          }
        } else {
          params[key] = value;
        }
      }
    });

    this.router.navigate(['/students'], {
      queryParams: {
        'params': JSON.stringify([ params ])
      }
    });
  }
}
