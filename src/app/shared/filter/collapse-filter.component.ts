import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { StorageService } from '@app/core';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'noe-collapse-filter',
  templateUrl: 'collapse-filter.component.html',
  styleUrls: ['collapse-filter.component.scss']
})
export class CollapseFilterComponent implements OnInit, AfterViewInit {
  @Input()
  private filterId;

  @Input()
  private title: string;

  public collapse;

  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.collapse = _.get(this.storageService.getItem(this.filterId), 'collapse', true);
  }

  ngAfterViewInit() {
    $(`#${this.filterId}`).collapse(this.collapse ? 'hide' : 'show');
  }

  public toggleCollapse() {
    this.collapse = !this.collapse;
    this.storageService.setItem(this.filterId, { collapse: this.collapse });
  }
}
