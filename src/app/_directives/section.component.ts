import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() showAdd: Boolean = true;
  @Input() showEdit: Boolean = true;
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  private add(event) {
    event.preventDefault();
    event.stopPropagation();
    this.onAdd.emit();
  }

  private edit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.onEdit.emit();
  }
}