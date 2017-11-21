import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService, StorageService, BusinessDetailService } from '@app/core';
import { BusinessInfoEditDialogComponent } from './business-info-edit-dialog.component';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: [
    '../../../shared/business/shared-business-styles.scss',
    './business-edit.component.scss'
  ]
})
export class BusinessEditComponent implements OnInit, OnDestroy {
  @ViewChild('infoEditDialog')
  private infoEditDialog: BusinessInfoEditDialogComponent;

  private model: { [key: string]: any } = {};

  private sub: Subscription;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private businessDetailService: BusinessDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.businessDetailService.fetchBusiness(id).subscribe();
        this.businessDetailService.getBusiness().subscribe(business => this.model = business);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get name() {
    return _.get(this.model, 'name', 'This is your business name');
  }

  get location() {
    const { city, state, country } = this.model;
    const address = [city, state, country];
    return address.filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.model, 'summary', 'Here is your business summary.');
  }

  get price() {
    const price = _.get(this.model, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get content() {
    return _.get(this.model, 'content', '');
  }

  get contentEmpty() {
    return _.isEmpty(this.content);
  }

  onEditBusinessInfo() {
    this.infoEditDialog.show();
  }

  onEditBusinessContent() {
    this.editingContent = true;
  }

  onSaveBusinessContent() {
    this.businessDetailService.updateBusiness(this.model).subscribe(() => {
      this.editingContent = false;
    });
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
