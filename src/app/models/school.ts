import { BasicInfoChecker } from './interfaces/basic-info-checker';
import * as _ from 'lodash';

export class School implements BasicInfoChecker {
  public _id: string;

  // basic info
  public avatar: string;
  public name: string;
  public type: string;
  public religion: string;
  public grade: string;
  public builtAt: Number;
  public students: Number;
  public avgClassSize: Number;
  public teachers: Number;
  public advTeachers: Number;
  public overseaStudents: Number;
  public accommodation: string;
  public media: string[];
  public introduction: string;
  public street: string;
  public city: string;
  public state: string;
  public zipcode: string;
  public country: string;

  constructor(school: School) {
    Object.assign(this, school);
  }

  hasValidBasicInfo() {
    return !_.isEmpty(this.name) && !_.isEmpty(this.type) && !_.isEmpty(this.religion) &&
        !_.isEmpty(this.grade) && !_.isEmpty(this.builtAt) && !_.isEmpty(this.accommodation) &&
        !_.isEmpty(this.street) && !_.isEmpty(this.city) && !_.isEmpty(this.state) &&
        !_.isEmpty(this.zipcode) && !_.isEmpty(this.country) && !_.isEmpty(this.introduction) &&
        this.students > 0 && this.avgClassSize > 0;
  }
}
