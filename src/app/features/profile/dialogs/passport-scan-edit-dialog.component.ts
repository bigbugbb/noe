import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService, ApplyingFileService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'noe-passport-scan-edit-dialog',
  templateUrl: 'passport-scan-edit-dialog.component.html',
  styleUrls: ['passport-scan-edit-dialog.component.scss']
})
export class PassportScanEditDialogComponent implements OnInit {
  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('passportScanInput')
  private passportScanInput: ElementRef;

  private type = '';

  public fileBaseUrl: string;
  public passportScans: Array<object>;
  public uploadings = [];

  constructor(
    private http: Http,
    private storageService: StorageService,
    private applyingFileService: ApplyingFileService
  ) {
    this.type = ApplyingFileService.ApplyingFileTypes.PassportScans;
  }

  ngOnInit() {
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;
    this.applyingFileService.getApplyingFiles(this.type).subscribe(passportScans => {
      this.passportScans = passportScans;
    });
  }

  public show() {
    this.dialog.show();
  }

  public addPassportScans() {
    this.passportScanInput.nativeElement.click();
  }

  public passportScansSelected(event) {
    Array.from(event.target.files).forEach((file: File) => {
      const filename = file.name;

      const request = this.applyingFileService.putApplyingFile(this.type, file, data => {
        this.applyingFileService.fetchApplyingFiles(this.type).subscribe(() => {
          this.uploadings = this.uploadings.filter(uploading => uploading.filename !== filename);
        });
      }, error => {
        this.uploadings = this.uploadings.filter(uploading => uploading.filename !== filename);
        // TODO: show some alert
      }, (loaded, total) => {
        let uploading = this.uploadings.find(uploading => uploading.filename === filename);
        uploading.progress = Math.ceil(loaded / total * 100);
      });

      this.uploadings.push({ filename, request, progress: 0 });
    });
  }

  public uploadingProgress(uploading) {
    if (uploading.progress === 100) {
      return 'processing';
    }
    return `${uploading.progress}%`;
  }

  public cancelUploading(event, uploading) {
    event.preventDefault();
    event.stopPropagation();
    uploading.request.abort();
  }

  public removePassportScan(event, passportScan) {
    event.preventDefault();
    event.stopPropagation();
    this.applyingFileService.deleteApplyingFile(this.type, passportScan.Key).subscribe();
  }

  public hasPassport() {
    return this.passportScans.length > 0 || this.uploadings.length > 0;
  }

  public fileUrlFrom(passportScan) {
    return this.fileBaseUrl + '/' + passportScan.Key;
  }

  public onClose() {
    this.dialog.hide();
  }
}