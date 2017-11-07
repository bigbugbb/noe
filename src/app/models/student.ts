import { BasicInfoChecker } from './interfaces/basic-info-checker';
import * as _ from 'lodash';

export class Student implements BasicInfoChecker {
  public _id: string;

  // basic intro
  public avatar: string;
  public firstname: string;
  public lastname: string;
  public grade: string;
  public school: string;
  public email: string;
  public phone: string;
  public applying: string;
  public birthday: string;
  public gender: string;
  public country: string;
  public budget: Number;
  public gpa: Number;
  public introduction: string;

  // standardized test scores
  public itep: Number;
  public slep: Number;
  public toefljr: Number;
  public toefl: Number;
  public ssat: Number;
  public ielts: Number;
  public gre: Number;
  public gmat: Number;

  // school preferred
  public preferredSchoolType: string;
  public preferredSchoolLocation: string;
  public preferredReligion: string;
  public preferredAccommodation: string;

  // skills and interests
  public skills: Array<string>;
  public interests: Array<string>;

  constructor(student: Student) {
    Object.assign(this, student);
  }

  hasValidBasicInfo() {
    return !_.isEmpty(this.firstname) && !_.isEmpty(this.lastname) &&
        !_.isEmpty(this.gender) && !_.isEmpty(this.birthday) && !_.isEmpty(this.country) &&
        !_.isEmpty(this.grade) && !_.isEmpty(this.school);
  }
}
