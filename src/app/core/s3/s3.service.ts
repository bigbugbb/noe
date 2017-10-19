import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: environment.bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: environment.identityPoolId })
    });

    this.s3 = new AWS.S3({
      params: { Bucket: environment.noeFilesUpload }
    });
  }

  public listObjects(prefix: string = '', callback?: (err, data) => void) {
    const params = {
      Prefix: prefix,
      Bucket: environment.noeFilesUpload
    };
    return this.s3.listObjectsV2(params, callback);
  }

  public putObject(file, key, acl, callback?: (err, data) => void) {
    const params = {
      Body: file,
      Key: key,
      ACL: acl,
      Bucket: environment.noeFilesUpload
    };
    return this.s3.putObject(params, callback);
  }

  public deleteObject(key, callback?: (err, data) => void) {
    const params = {
      Key: key,
      Bucket: environment.noeFilesUpload
    };
    return this.s3.deleteObject(params, callback);
  }

  public listObjectsObservable(prefix: string = ''): Observable<Response> {
    const params = {
      Prefix: prefix
    };
    const listObjectsObservable = Observable.bindNodeCallback<AWS.S3.ListObjectsV2Request>(
      this.s3.listObjectsV2
    ).bind(this.s3);
    return listObjectsObservable(params);
  }

  public putObjectObservable(file, key, acl): Observable<Response> {
    const params = {
      Body: file,
      Key: key,
      ACL: acl
    };
    const putObjectObservable = Observable.bindNodeCallback<AWS.S3.PutObjectRequest>(
      this.s3.putObject
    ).bind(this.s3);
    return putObjectObservable(params);
  }

  public deleteObjectObservable(key): Observable<Response> {
    const params = {
      Key: key
    };
    const deleteObjectObservable = Observable.bindNodeCallback<AWS.S3.DeleteObjectRequest>(
      this.s3.deleteObject
    ).bind(this.s3);
    return deleteObjectObservable(params);
  }

}