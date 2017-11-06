import { Activity } from './activity';
import { Service } from './service';

export class Company {
  public _id: string;

  constructor(
    public avatar: string,
    public name: string,
    public introduction: string,
    public media: string[],
    public email: string,
    public phone: string,
    public country: string,
    public activities: Activity[],
    public services: Service[]
  ) {}
}
