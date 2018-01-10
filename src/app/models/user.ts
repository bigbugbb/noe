export class User {
  public _id: string;
  public phone: string;
  public firstname: string;
  public lastname: string;
  public profile: object;

  constructor(
    public email: string,
    public password: string,
    public role: string
  ) {}
}
