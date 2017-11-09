import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService, BusinessService, StorageService } from '@app/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit, OnDestroy {
  private model: { [key: string]: any } = { content: '' };

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private businessService: BusinessService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onEditCustomContent() {

  }

  onChange(event) {

  }

  onReady(event) {

  }

  onFocus(event) {

  }

  onBlur(event) {

  }
}
