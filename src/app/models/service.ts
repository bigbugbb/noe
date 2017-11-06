export class Service {
  public _id: string;
  public ownerId: string;

  constructor(
    public avatar: string,
    public name: string,
    public type: string,
    public summary: string,
    public media: string[],
    public price: Number,
    public email: string,
    public phone: string
  ) {}
}
