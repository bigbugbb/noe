import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService, ApplicationChecklistService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'passport-scan-edit-dialog',
  templateUrl: 'passport-scan-edit-dialog.component.html',
  styleUrls: ['passport-scan-edit-dialog.component.scss']
})
export class PassportScanEditDialogComponent implements OnInit {

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('passportScanInput')
  private passportScanInput: ElementRef;

  public fileBaseUrl: string;
  public passportScans: Array<object>;

  constructor(
    private http: Http,
    private storageService: StorageService,
    private applicationChecklistService: ApplicationChecklistService
  ) {}

  ngOnInit() {
    this.fileBaseUrl = `https://s3.amazonaws.com/${environment.noeFilesUpload}`;
    this.applicationChecklistService.getPassportScans().subscribe(passportScans => this.passportScans = passportScans);
  }

  public show() {
    this.dialog.show();
  }

  public addPassportScans() {
    this.passportScanInput.nativeElement.click();
  }

  public passportScansSelected(event) {
    Array.from(event.target.files).forEach((file) => {
      this.applicationChecklistService.putPassportScan(file).subscribe();
    });
  }

  public removePassportScan(event, passportScan) {
    event.preventDefault();
    event.stopPropagation();

    this.applicationChecklistService.deletePassportScan(passportScan.Key).subscribe();
  }

  public fileUrlFrom(passportScan) {
    return this.fileBaseUrl + '/' + passportScan.Key;
  }

  public onClose() {
    this.dialog.hide();
  }
}