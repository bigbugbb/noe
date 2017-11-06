export class School {
  public _id: string;

  constructor(
    // basic info
    public avatar: string,
    public name: string,
    public type: string,
    public religion: string,
    public grade: string,
    public builtAt: Number,
    public students: Number,
    public avgClassSize: Number,
    public teachers: Number,
    public advTeachers: Number,
    public overseaStudents: Number,
    public accommodation: string,
    public media: string[],
    public introduction: string,
    public street: string,
    public city: string,
    public state: string,
    public zipcode: Number,
    public country: string
  ) {}
}
