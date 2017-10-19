import { Injectable } from '@angular/core';

import { S3Service } from '@app/core/s3/s3.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as AWS from 'aws-sdk';

@Injectable()
export class ApplicationChecklistService {
  private subjects = {};
  private subjectPassportScans: BehaviorSubject<Array<object>>;
  private subjectRecommendations: BehaviorSubject<Array<object>>;

  constructor(
    private s3Service: S3Service,
    private storageService: StorageService
  ) {
    const types = ['passport-scans', 'recommendations', 'transcripts', 'financialInfo', 'supplements'];
    types.forEach(type => {
      const defaultValue = this.storageService.getItem(type) || new Array<object>();
      this.subjects[type] = new BehaviorSubject(defaultValue);
    });
  }

  /* Passport Scans */
  public getPassportScans() {
    return this.getObjectsObservable('passport-scans');
  }

  public fetchPassportScans(): Observable<Array<object>> {
    return this.fetchObjects('passport-scans');
  }

  public putPassportScan(file): Observable<Array<object>> {
    return this.putObject('passport-scans', file);
  }

  public deletePassportScan(key): Observable<Array<object>> {
    return this.deleteObject('passport-scans', key);
  }

  /* Recommendations */
  public getRecommendations() {
    return this.getObjectsObservable('recommendations');
  }

  public fetchRecommendations(): Observable<Array<object>> {
    return this.fetchObjects('recommendations');
  }

  public putRecommendation(file): Observable<Array<object>> {
    return this.putObject('recommendations', file);
  }

  public deleteRecommendation(key): Observable<Array<object>> {
    return this.deleteObject('recommendations', key);
  }

  /* Transcripts */
  public getTranscripts() {
    return this.getObjectsObservable('transcripts');
  }

  public fetchTranscripts(): Observable<Array<object>> {
    return this.fetchObjects('transcripts');
  }

  public putTranscript(file): Observable<Array<object>> {
    return this.putObject('transcripts', file);
  }

  public deleteTranscript(key): Observable<Array<object>> {
    return this.deleteObject('transcripts', key);
  }

  /* Financial Info */
  public getFinancialInfo() {
    return this.getObjectsObservable('financial-info');
  }

  public fetchFinancialInfo(): Observable<Array<object>> {
    return this.fetchObjects('financial-info');
  }

  public putFinancialInfo(file): Observable<Array<object>> {
    return this.putObject('financial-info', file);
  }

  public deleteFinancialInfo(key): Observable<Array<object>> {
    return this.deleteObject('financial-info', key);
  }

  /* Supplements */
  public getSupplements() {
    return this.getObjectsObservable('supplements');
  }

  public fetchSupplements(): Observable<Array<object>> {
    return this.fetchObjects('supplements');
  }

  public putSupplements(file): Observable<Array<object>> {
    return this.putObject('supplements', file);
  }

  public deleteSupplements(key): Observable<Array<object>> {
    return this.deleteObject('supplements', key);
  }

  // util methods

  private getObjectsObservable(type: string) {
    return this.subjects[type].asObservable();
  }

  private fetchObjects(type: string): Observable<Array<object>> {
    const prefix = this.objectsPrefix(type);
    return this.s3Service.listObjects(prefix).map(response => {
      return this.updateFromResponse(type, response);
    });
  }

  private putObject(type: string, file: File): Observable<Array<object>> {
    const prefix = this.objectsPrefix(type);
    const key = prefix + '/' + encodeURIComponent(file.name);
    return this.s3Service.putObject(file, key, 'public-read').flatMap(response => {
      return this.s3Service.listObjects(prefix);
    }).map(response => {
      return this.updateFromResponse(type, response);
    });
  }

  private deleteObject(type: string, key: string): Observable<Array<object>> {
    const prefix = this.objectsPrefix(type);
    return this.s3Service.deleteObject(key).flatMap(response => {
      return this.s3Service.listObjects(prefix);
    }).map(response => {
      return this.updateFromResponse(type, response);
    });
  }

  private objectsPrefix(type) {
    const user = this.storageService.getUser();
    return `students/${user._id}/application-checklist/${type}`;
  }

  private updateFromResponse(type, response) {
    const objects = response['Contents'];
    this.subjects[type].next(objects);
    this.storageService.setItem(type, objects);
    return objects;
  }
}
