import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'noe-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFilterChanged() {
    console.log('onFilterChanged');
  }
}
