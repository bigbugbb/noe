import { User, Business } from '@app/models';

export class Order {
  public _id: string;

  public customer: User;
  public business: Business;
  public charge: string;
  public price: number;
  public status;

  constructor() {}
}
