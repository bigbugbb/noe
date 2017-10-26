import { Component, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-keywords-filter',
  styles: [`
    .space {
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
    <app-collapse-filter class="item" [filterId]="'keywords'" [title]="'Keywords'">
      <div filter-body style="padding: 1rem 2rem 0 0">
        <label for="firstname">Firstname</label>
        <input type="text" class="form-control" id="firstname"
                name="firstname"
                ngModel
                required>

        <span style="display:block; height: 0.6rem;"></span>

        <label for="lastname">Lastname</label>
        <input type="text" class="form-control" id="lastname"
                name="lastname"
                ngModel
                required>

        <span style="display:block; height: 0.6rem;"></span>

        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
                name="email"
                ngModel
                required>

        <span style="display:block; height: 0.6rem;"></span>

        <label for="school">School</label>
        <input type="text" class="form-control" id="school"
                name="school"
                ngModel
                required>

        <span class="space"></span>

        <div class="update">
          <button class="btn btn-sm btn-primary" (click)="filterChanged.emit()">Update</button>
        </div>
      </div>
    </app-collapse-filter>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class KeywordsFilterComponent {
  @Output()
  private filterChanged: EventEmitter<any> = new EventEmitter();
}
