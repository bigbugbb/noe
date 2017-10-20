export class Student {
  public _id: string;

  constructor(
    public userId: string,
    // basic intro
    public avatar: string,
    public firstname: string,
    public lastname: string,
    public grade: string,
    public school: string,
    public email: string,
    public phone: string,
    public applying: string,
    public birthday: string,
    public gender: string,
    public country: string,
    public budget: Number,
    public gpa: Number,
    public introduction: string,
    // standardized test scores
    public itep: Number,
    public slep: Number,
    public toeflJr: Number,
    public toefl: Number,
    public ssat: Number,
    public gre: Number,
    public gmat: Number,
    // school preferred
    public preferredSchoolType: string,
    public preferredSchoolLocation: string,
    public preferredReligion: string,
    public preferredAccommodation: string,
    // skills and interests
    public skills: Array<string>,
    public interests: Array<string>,
  ) {}
}
