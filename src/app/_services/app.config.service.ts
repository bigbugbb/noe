import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppConfigService {

  private env:    Object = null;
  private config: Object = null;
  
  constructor(private http: Http) {

  }

  public getEnv(key: any) {
    return this.env[key];
  }

  public getConfig(key: any) {
    return this.config[key];
  }

  /**
   * This method:
   * a) Loads "env.json" to get the current working environment (e.g.: 'production, 'development')
   * b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('env.json')
        .map(res => res.json())
        .catch((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          reject('Configuration file "env.json" could not be read');
          return Observable.throw(error.json().error || 'Server error');
        }).subscribe((envResponse) => {
          this.env = envResponse;
          let request: any = null;

          switch (envResponse.env) {
            case 'production': {
              request = this.http.get('config.' + envResponse.env + '.json');
            } break;

            case 'development': {
              request = this.http.get('config.' + envResponse.env + '.json');
            } break;

            case 'default': {
              console.error('Environment file is not set or invalid');
              reject('Environment file is not set or invalid')
            } break;
          }

          if (request) {
            request
              .map(res => res.json())
              .catch((error: any) => {
                console.error(`Error reading ${envResponse.env} configuration file`);
                reject(`Error reading ${envResponse.env} configuration file`);
                return Observable.throw(error.json().error || 'Server error');
              })
              .subscribe((responseData) => {
                this.config = responseData;
                resolve(true);
              })
          } else {
            console.error('Env config file "env.json" is not valid');
            reject('Env config file "env.json" is not valid');
          }
        });
    });
  }
}