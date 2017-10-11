export class Student {
  public _id: string;

  constructor(
    public userId: string,
    public firstname: string,
    public lastname: string,
    public avatar: string,
    public nationality: string,
    public dob: Date,
    public gender: string,
    public phone: string
  ) {}
}