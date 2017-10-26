import { Component, Input } from '@angular/core'
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-std-test-score-range',
  templateUrl: './std-test-score-range.component.html',
  styleUrls: ['./std-test-score-range.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    { provide: ControlContainer, useExisting: NgModelGroup }
  ]
})
export class StdTestScoreRangeComponent {
  @Input()
  public stdTest = '';

  get dataTarget() {
    return `#${this.stdTest}`;
  }
}
