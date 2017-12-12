import { User } from './user';

export class ThreadState {
  public state: string;
  public messagesNotRead: number;

  constructor() {}
}

export class Thread {
  public _id: string;
  public author: User;
  public target: User;
  public lastMessage: string;
  public authorState: ThreadState;
  public targetState: ThreadState;

  constructor() {}
}
