export class Jabber {
  public id: string;
  public name: string;
  public avatar: string;
  public lastAccess: Date;

  constructor() {}
}

export class Thread {
  public _id: string;
  public author: Jabber;
  public target: Jabber;
  public lastMessage: string;

  constructor() {}
}
