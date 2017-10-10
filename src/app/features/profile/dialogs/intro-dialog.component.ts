import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DialogComponent } from '@app/shared';

@Component({
  selector: 'intro-dialog',
  templateUrl: 'intro-dialog.component.html',
  styleUrls: ['intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @Input()
  public editAdd = true;

  public loading = false;

  constructor() {}

  ngOnInit() {}

  public show() {
    this.dialog.show();
  }

  public delete() {
    this.dialog.hide();
  }

  public save() {
    this.dialog.hide();
  }
}