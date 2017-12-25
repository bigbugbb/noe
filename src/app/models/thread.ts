export class Jabber {
  public lastAccess: Date;

  constructor(
    public id: string,
    public name: string,
    public role: string,
    public avatar: string
  ) {}
}

export class Thread {
  public _id: string;
  public lastMessage: string;
  public opened: boolean;
  public messagesNotRead: number;

  constructor(
    public author: Jabber,
    public target: Jabber
  ) {}
}
