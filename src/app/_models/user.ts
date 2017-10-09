export class User {
  public id: number;

  constructor(    
    public email: string,
    public phone: string,
    public password: string,
    public firstname: string,
    public lastname: string
  ) {}
}