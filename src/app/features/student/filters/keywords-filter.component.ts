import { Component, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'noe-student-keywords-filter',
  styles: [`
    .vspace {
      display: block;
      height: 0.6rem;
    }

    .update {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  `],
  template: `
    <noe-collapse-filter class="item" [filterId]="'keywords'" [title]="'Keywords'">
      <div filter-body style="padding: 1rem 2rem 0 0">
        <div *ngFor="let keyword of keywords;">
          <label for="{{ keyword }}">{{ keyword | capitalize }}</label>
          <input type="text" class="form-control" id="{{ keyword }}"
                  name="{{ keyword }}"
                  ngModel
                  required>
          <span class="vspace"></span>
        </div>
        <div class="update">
          <button class="btn btn-sm btn-primary" (click)="filterChanged.emit()">Update</button>
        </div>
      </div>
    </noe-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class KeywordsFilterComponent {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();

  private keywords = ['firstname', 'lastname', 'email', 'school'];
}
