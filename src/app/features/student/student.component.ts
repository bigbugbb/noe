import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { StudentService } from '@app/core';
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
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.studentService.cacheQueryParams(_.get(queryParams, 'params'));
      this.studentService.filtersFromCachedQueryParams().subscribe(filters => this.filters = filters);
      this.studentService.getAll(queryParams).subscribe(result => {
        this.students = result.students;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterChanged() {
    const params = this.studentService.simplifyQueryParams(this.filterForm.value);

    this.router.navigate(['/students'], {
      queryParams: {
        params: JSON.stringify([ params ])
      }
    });
  }
}
