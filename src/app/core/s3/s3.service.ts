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

  public listObjects(prefix: string = ''): Observable<Response> {
    const params = {
      Prefix: prefix
    };
    const listObjectsObservable = Observable.bindNodeCallback<AWS.S3.ListObjectsV2Request>(
      this.s3.listObjectsV2
    ).bind(this.s3);
    return listObjectsObservable(params);
  }

  public getObject(key) {

  }

  public putObject(file, key, acl): Observable<Response> {
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

  public deleteObject(key): Observable<Response> {
    const params = {
      Key: key
    };
    const deleteObjectObservable = Observable.bindNodeCallback<AWS.S3.DeleteObjectRequest>(
      this.s3.deleteObject
    ).bind(this.s3);
    return deleteObjectObservable(params);
  }

}