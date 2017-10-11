export class Student {
  public _id: string;

  constructor(
    public userId: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public avatar: string,
    public birthday: Date,
    public gender: string,
    public nationality: string,
    public introduction: string
  ) {}
}