import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'work-with-us.component.html',
  styleUrls: ['./work-with-us.component.scss'],
})
export class WorkWithUsComponent implements OnInit {
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
