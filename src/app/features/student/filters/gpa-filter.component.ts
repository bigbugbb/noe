import { Component, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-gpa-filter',
  styles: [`
    .hspace {
      display: block;
      width: 1rem;
    }

    .vspace {
      display: block;
      height: 0.6rem;
    }

    .gpa-container {
      display: flex;
      flex-direction: row;
    }

    .update {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `],
  template: `
    <app-collapse-filter ngModelGroup="gpa" class="item" [filterId]="'gpa'" [title]="'GPA'">
      <div filter-body style="padding: 1rem 2rem 0 0;">
        <div class="gpa-container w-100">
          <input type="number" class="form-control" id="min"
            name="min"
            placeholder="Min"
            ngModel
            required>

          <span class="hspace"></span>

          <input type="number" class="form-control" id="max"
            name="max"
            placeholder="Max"
            ngModel
            required>
        </div>

        <span class="vspace"></span>

        <div class="update">
          <button class="btn btn-sm btn-primary" (click)="filterChanged.emit()">Update</button>
        </div>
      </div>
    </app-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GpaFilterComponent {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();
}

