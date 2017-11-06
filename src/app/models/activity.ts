export class Activity {
  public _id: string;

  constructor(
    public avatar: string,
    public name: string,
    public type: string,
    public summary: string,
    public media: string[],
    public price: Number,
    public startTime: Date,
    public stopTime: Date,
    public itinerary: string,
    public email: string,
    public phone: string
  ) {}
}
