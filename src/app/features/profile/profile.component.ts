import { Component, OnInit, ViewChild } from '@angular/core';

import { IntroDialogComponent } from './dialogs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private profile: any = {};

  @ViewChild('introDialog')
  private introDialog: IntroDialogComponent;

  constructor() { }

  ngOnInit() {
  }

  public onEditIntro() {
    console.log("onEditIntro");
    this.introDialog.show();
  }
}
