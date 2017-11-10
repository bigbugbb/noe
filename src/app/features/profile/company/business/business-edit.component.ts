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
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      this.businessService.getById(id).subscribe(result => {
        this.model = _.get(result, 'business', { content: '' });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get location() {
    return `${this.model.city}, ${this.model.state}, ${this.model.country}`;
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
