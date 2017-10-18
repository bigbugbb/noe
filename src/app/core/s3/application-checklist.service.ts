import { Injectable } from '@angular/core';

import { S3Service } from '@app/core/s3/s3.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as AWS from 'aws-sdk';

@Injectable()
export class ApplicationChecklistService {
  private listObjectsObservable: Observable<Response>;
  private subjectPassportScans: BehaviorSubject<Array<object>>;

  constructor(
    private s3Service: S3Service,
    private storageService: StorageService
  ) {
    this.subjectPassportScans = new BehaviorSubject(new Array<object>());
  }

  public getPassportScans() {
    return this.subjectPassportScans.asObservable();
  }

  public fetchPassportScans(): Observable<Array<object>> {
    const prefix = this.passportScanPrefix();
    return this.s3Service.listObjects(prefix).map(response => {
      const passportScans = response['Contents'];
      this.subjectPassportScans.next(passportScans);
      return passportScans;
    });
  }

  public putPassportScan(file): Observable<Array<object>> {
    const prefix = this.passportScanPrefix();
    const key = prefix + '/' + encodeURIComponent(file.name);
    return this.s3Service.putObject(file, key, 'public-read').flatMap(response => {
      return this.s3Service.listObjects(prefix);
    }).map(response => {
      const passportScans = response['Contents'];
      this.subjectPassportScans.next(passportScans);
      return passportScans;
    });
  }

  public deletePassportScan(key): Observable<Array<object>> {
    const prefix = this.passportScanPrefix();
    return this.s3Service.deleteObject(key).flatMap(response => {
      return this.s3Service.listObjects(prefix);
    }).map(response => {
      const passportScans = response['Contents'];
      this.subjectPassportScans.next(passportScans);
      return passportScans;
    });
  }

  private passportScanPrefix() {
    const user = this.storageService.getUser();
    return `students/${user._id}/application-checklist/passport-scans`;
  }
}