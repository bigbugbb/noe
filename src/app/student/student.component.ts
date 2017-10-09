import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  private basicInfo: any = {};

  constructor() { }

  ngOnInit() {
  }

  public onEditBasicProfile() {
    console.log("onEditBasicProfile");
  }
}
