import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'noe-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() header = '';
  @Input() showAdd = true;
  @Input() showEdit = true;
  @Output() onAdd = new EventEmitter();
  @Output() onEdit = new EventEmitter();

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