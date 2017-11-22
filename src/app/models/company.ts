import { Business } from './business';
import { BasicProfileInfoChecker } from './interfaces/basic-profile-info-checker';
import * as _ from 'lodash';

export class Company implements BasicProfileInfoChecker {
  public _id: string;

  // basic info
  public avatar: string;
  public name: string;
  public email: string;
  public phone: string;
  public ein: string;
  public street: string;
  public city: string;
  public state: string;
  public zipcode: string;
  public country: string;
  public introduction: string;

  constructor(company: Company) {
    _.assign(this, company);
  }

  hasBasicProfileInfo() {
    return !_.isEmpty(this.name) && !_.isEmpty(this.country) && !_.isEmpty(this.introduction);
  }
}
