import { Activity } from './activity';
import { Service } from './service';
import { BasicInfoChecker } from './interfaces/basic-info-checker';
import * as _ from 'lodash';

export class Company implements BasicInfoChecker {
  public _id: string;

  // basic info
  public avatar: string;
  public name: string;
  public introduction: string;
  public media: string[];
  public email: string;
  public phone: string;
  public country: string;
  public activities: Activity[];
  public services: Service[];

  constructor(company: Company) {
    Object.assign(this, company);
  }

  hasValidBasicInfo() {
    return !_.isEmpty(this.name) && !_.isEmpty(this.country) && !_.isEmpty(this.introduction);
  }
}
