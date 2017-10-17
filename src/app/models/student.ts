import { Resource } from './_resource';

export class Student {
  public _id: String;

  constructor(
    public userId: String,
    // basic intro
    public avatar: String,
    public firstname: String,
    public lastname: String,
    public grade: String,
    public school: String,
    public email: String,
    public phone: String,
    public applying: String,
    public birthday: String,
    public gender: String,
    public country: String,
    public budget: Number,
    public gpa: Number,
    public introduction: String,
    // school preferred
    public preferredSchoolType: String,
    public preferredSchoolLocation: String,
    public preferredReligion: String,
    public preferredAccommodation: String,
    // skills and interests
    public skills: Array<String>,
    public interests: Array<String>,
    // application checklist
    public travalDocs: Array<Resource>,
    public recommendations: Array<Resource>,
    public transcripts: Array<Resource>,
    public stdTestScores: Array<Resource>,
    public financialInfo: Array<Resource>,
    public supplements: Array<Resource>
  ) {}
}