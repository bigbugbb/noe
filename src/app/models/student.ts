export class Student {
  public _id: string;

  constructor(
    public userId: string,
    public firstname: string,
    public lastname: string,
    public education: string,
    public school: string,
    public email: string,
    public phone: string,
    public avatar: string,
    public birthday: Date,
    public gender: string,
    public country: string,
    public introduction: string
  ) {}
}