import { Db } from "../config";

export class User implements IUser {
  public id?: string;
  public sid?: string;
  public username: string;
  public password: string;
  public email: string;

  constructor(user: IUser) {
    this.sid = user.sid;
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
  }

  static exec() {
    return Db.getClient();
  }

  static close() {
    Db.close();
  }
}

export interface IUser {
  id?: string;
  sid?: string;
  username: string;
  password: string;
  email: string;
}
