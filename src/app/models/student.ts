export class Student {
  public _id: String;

  constructor(
    // intro
    public userId: String,
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
    public introduction: String,
    // school preferred
    public preferredSchoolType: String = "",
    public preferredSchoolLocation: String,
    public preferredReligion: String,
    public preferredAccommodation: String,
  ) {}
}