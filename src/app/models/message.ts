import { User } from './user';

/**
 * Message represents one message being sent in a Thread
 */
export class Message {
  public _id: string;
  public author: string;
  public target: string;
  public text: string;
  public sentAt: Date;
  public thread: string;

  constructor() {}
}
