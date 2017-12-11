import { User } from './user';

/**
 * Message represents one message being sent in a Thread
 */
export class Message {
  public _id: string;
  public author: User;
  public target: User;
  public text: string;
  public sentAt: Date;
  public read: boolean;

  constructor() {}
}
