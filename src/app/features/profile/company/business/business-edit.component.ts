import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService, StorageService, BusinessDetailService } from '@app/core';
import { BusinessInfoEditDialogComponent } from '../dialogs/business-info-edit-dialog.component';
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
  private content = '';

  private sub: Subscription;

  private editingContent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private profileService: ProfileService,
    private businessDetailService: BusinessDetailService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const { id } = params;
      if (!_.isEmpty(id)) {
        this.businessDetailService.fetchBusiness(id).subscribe();
        this.businessDetailService.getBusiness().subscribe(value => {
          this.model = value;
          this.fetchContent(_.get(this.model, 'content', ''));
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchContent(url) {
    if (_.isEmpty(url) || !url.startsWith('http')) { return; }
    this.http.get(url).subscribe(value => this.content = _.get(value, '_body', ''));
  }

  private activate() {
    const business = _.assign({}, this.model);
    business.status = 'active';
    this.businessDetailService.updateBusiness(business).subscribe();
  }

  private deactivate() {
    const business = _.assign({}, this.model);
    business.status = 'inactive';
    this.businessDetailService.updateBusiness(business).subscribe();
  }

  get name() {
    return _.get(this.model, 'name', 'This is your business name');
  }

  get location() {
    const { address, country } = this.model;
    return [ address, country ].filter(item => !_.isEmpty(item)).join(', ');
  }

  get summary() {
    return _.get(this.model, 'summary', 'Here is your business summary.');
  }

  get price() {
    const price = _.get(this.model, 'price', undefined);
    return price !== undefined ? '$' + price : 'Undefined';
  }

  get status() {
    return _.get(this.model, 'status', 'draft');
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
    this.model.content = this.content;
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
