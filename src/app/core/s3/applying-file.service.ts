import { Injectable } from '@angular/core';

import { S3Service } from '@app/core/s3/s3.service';
import { StorageService } from '@app/core/storage/storage.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';

@Injectable()
export class ApplyingFileService {
  public static ApplyingFileTypes = {
    PassportScans: 'passport-scans',
    Recommendations: 'recommendations',
    Transcripts: 'transcripts',
    FiancialInfo: 'financial-info-docs',
    Supplements: 'supplements',
    OptionalMaterials: 'optional-materials'
  };

  private subjects = {};

  constructor(
    private s3Service: S3Service,
    private storageService: StorageService
  ) {
    const types = _.values(ApplyingFileService.ApplyingFileTypes);
    types.forEach(type => {
      const defaultValue = this.storageService.getItem(type) || new Array<object>();
      this.subjects[type] = new BehaviorSubject(defaultValue);
    });
  }

  public getApplyingFiles(type: string) {
    return this.subjects[type].asObservable();
  }

  public fetchApplyingFiles(type: string): Observable<Array<object>> {
    const prefix = this.objectsPrefix(type);
    return this.s3Service.listObjectsObservable(prefix).map(response => {
      return this.updateFromResponse(type, response);
    });
  }

  public putApplyingFile(type: string, file: File,
        onSuccess: (data) => void, onError?: (error) => void, onProgress?: (loaded, total) => void) {
    const prefix = this.objectsPrefix(type);
    const key = prefix + '/' + encodeURIComponent(file.name);
    const acl = 'public-read';
    const request = this.s3Service.putObject(file, key, acl, (err, data) => {
      if (err && onError) onError(err);
      onSuccess(data);
    });
    request.on('httpUploadProgress', (progress) => {
      if (onProgress) {
        onProgress(progress.loaded, progress.total);
      }
    });
    return request;
  }

  public deleteApplyingFile(type: string, key: string): Observable<Array<object>> {
    const prefix = this.objectsPrefix(type);
    return this.s3Service.deleteObjectObservable(key).flatMap(response => {
      return this.s3Service.listObjectsObservable(prefix);
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
