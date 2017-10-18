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
    // school preferred
    public preferredSchoolType: string,
    public preferredSchoolLocation: string,
    public preferredReligion: string,
    public preferredAccommodation: string,
    // skills and interests
    public skills: Array<string>,
    public interests: Array<string>,
    // application checklist
    // public passportScans: Array<Resource>,
    // public recommendations: Array<Resource>,
    // public transcripts: Array<Resource>,
    // public stdTestScores: Array<Resource>,
    // public financialInfo: Array<Resource>,
    // public supplements: Array<Resource>
  ) {}
}