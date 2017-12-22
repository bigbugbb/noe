import { User } from './user';

const uuidv4 = require('uuid/v4');

/**
 * Message represents one message being sent in a Thread
 */
export class Message {
  public _id: string;
  public sentAt: Date;
  public uuid: string;

  constructor(
    public author: string,
    public target: string,
    public thread: string,
    public text: string
  ) {
    this.uuid = uuidv4();
  }
}
