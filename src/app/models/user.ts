export class User {
  public _id: string;

  constructor(
    public email: string,
    public phone: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public role: string,
    public profile: object
  ) {}
}