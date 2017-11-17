import { Student, Business } from '@app/models';

export class Order {
  public _id: string;

  public student: Student;
  public business: Business;
  public stripeOrder: string;
  public status;

  constructor() {}
}
