export class Jabber {
  public lastAccess: Date;

  constructor(
    public id: string,
    public name: string,
    public avatar: string
  ) {}
}

export class Thread {
  public lastMessage: string;
  public opened: boolean;
  public messagesNotRead: number;

  constructor(
    public _id: string,
    public author: Jabber,
    public target: Jabber
  ) {}
}
