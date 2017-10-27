import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'noe-std-test-score-range',
  templateUrl: './std-test-score-range.component.html',
  styleUrls: ['./std-test-score-range.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    { provide: ControlContainer, useExisting: NgModelGroup }
  ]
})
export class StdTestScoreRangeComponent implements AfterViewInit {
  @Input()
  public stdTest = '';

  @Input()
  public range: { [key: string]: any };

  @Output()
  private rangeChanged: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {
    // $(`#${this.stdTest}`).collapse(
    //   _.isNumber(this.range.min) || _.isNumber(this.range.max) ? 'show' : 'hide'
    // );
    // if ( _.isNumber(this.range.min) || _.isNumber(this.range.max)) {
      $(`#${this.stdTest}-checkbox`).prop('checked', true);
    // }
  }

  get dataTarget() {
    return `#${this.stdTest}`;
  }
}
