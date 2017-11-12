import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService, StorageService } from '@app/core';
import { BusinessEditService } from './business-edit.service';
import { BusinessInfoEditDialogComponent } from './business-info-edit-dialog.component';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'noe-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
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
    private businessEditService: BusinessEditService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.businessEditService.fetchBusiness(id).subscribe();
        this.businessEditService.getBusiness().subscribe(business => this.model = business);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get location() {
    const { city, state, country } = this.model;
    const address = [city, state, country];
    const location = address.filter(item => !_.isEmpty(item));
    return location.join(', ');
  }

  get price() {
    // TODO: format currency type based on the location
    return `$${this.model.price}`;
  }

  get content() {
    return _.get(this.model, 'content', '');
  }

  onEditBusinessInfo() {
    this.infoEditDialog.show();
  }

  onEditBusinessContent() {
    this.editingContent = true;
  }

  onSaveBusinessContent() {
    this.businessEditService.updateBusiness(this.model).subscribe(() => {
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
