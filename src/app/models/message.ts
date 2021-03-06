import { User } from './user';
import { Thread } from './thread';

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
    public thread: Thread,
    public text: string
  ) {
    this.uuid = uuidv4();
  }
}
