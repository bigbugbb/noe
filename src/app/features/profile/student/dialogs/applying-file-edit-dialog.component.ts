import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ProfileService, StorageService, ApplyingFileService } from '@app/core';
import { DialogComponent } from '@app/shared';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'noe-applying-file-edit-dialog',
  templateUrl: 'applying-file-edit-dialog.component.html',
  styleUrls: ['applying-file-edit-dialog.component.scss']
})
export class ApplyingFileEditDialogComponent implements OnInit {
  @Input()
  public title = '';

  @Input()
  public type = '';

  @Input()
  public accept = 'application/pdf';

  @Input('uploadBtnText')
  public uploadBtnText = '';

  @ViewChild('dialog')
  private dialog: DialogComponent;

  @ViewChild('applyingFileInput')
  private applyingFileInput: ElementRef;

  public fileBaseUrl: string;
  public applyingFiles: Array<object>;
  public uploadings = [];

  constructor(
    private http: Http,
    private storageService: StorageService,
    private applyingFileService: ApplyingFileService
  ) { }

  ngOnInit() {
    this.fileBaseUrl = `https://s3.${environment.bucketRegion}.amazonaws.com/${environment.noeFilesUpload}`;
    this.applyingFileService.getApplyingFiles(this.type).subscribe(applyingFiles => {
      this.applyingFiles = applyingFiles;
    });
  }

  get acceptPdf() {
    return this.accept === 'application/pdf';
  }

  get acceptImage() {
    return this.accept === 'image/*';
  }

  public show() {
    this.dialog.show();
  }

  public selectApplyingFiles() {
    this.applyingFileInput.nativeElement.click();
  }

  public applyingFilesSelected(event) {
    Array.from(event.target.files).forEach((file: File) => {
      const filename = file.name;

      const request = this.applyingFileService.putApplyingFile(this.type, file, data => {
        this.applyingFileService.fetchApplyingFiles(this.type).subscribe(() => {
          this.uploadings = this.uploadings.filter(item => item.filename !== filename);
        });
      }, error => {
        this.uploadings = this.uploadings.filter(item => item.filename !== filename);
        // TODO: show some alert
      }, (loaded, total) => {
        const uploading = this.uploadings.find(item => item.filename === filename);
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

  public removeApplyingFile(event, applyingFile) {
    event.preventDefault();
    event.stopPropagation();
    this.applyingFileService.deleteApplyingFile(this.type, applyingFile.Key).subscribe();
  }

  public hasApplyingFile() {
    return this.applyingFiles.length > 0 || this.uploadings.length > 0;
  }

  public fileUrlFrom(applyingFile) {
    return this.fileBaseUrl + '/' + applyingFile.Key;
  }

  public nameOfApplyingFile(object) {
    return decodeURIComponent(object.Key.split('/').pop());
  }

  public uploadingFilename(uploading) {
    return decodeURIComponent(uploading.filename);
  }

  public trackByKey(index, item) {
    return item.Key;
  }

  public onClose() {
    this.dialog.hide();
  }
}
