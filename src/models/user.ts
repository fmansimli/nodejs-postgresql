import { MyDatabase } from "../config";
import { Role } from "../enums";

export class User implements IUser {
  public _id?: string;
  public sid?: string;
  public username: string;
  public password: string;
  public email: string;
  public emailVerified;
  public name: string;
  public surname: string;
  public followers: [];
  public followings: [];
  public provider: Provider;
  public imageUrl?: string;
  public blocked: boolean;
  public roles: string[];
  public isActive: boolean;
  public facebook?: string;
  public twitter?: string;
  public linkedin?: string;
  public instagram?: string;
  public dateOfBirth?: Date;

  public favoritePlaces: [];
  public favoriteTripes: [];
  public activeTripes: [];

  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(user: IUser) {
    this.sid = user.sid;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.surname = user.surname;
    this.username = user.username;
    this.dateOfBirth = user.dateOfBirth;
    this.updatedAt = new Date();
    this.imageUrl = user.imageUrl;
    this.facebook = user.facebook;
    this.twitter = user.twitter;
    this.instagram = user.instagram;
    this.linkedin = user.linkedin;
    this.provider = user.provider || "local";
    this.isActive = user.isActive || true;
    this.blocked = user.blocked || false;
    this.favoriteTripes = user.favoriteTripes || [];
    this.favoritePlaces = user.favoritePlaces || [];
    this.activeTripes = user.activeTripes || [];
    this.followers = user.followers || [];
    this.followings = user.followings || [];
    this.emailVerified = user.emailVerified || false;
    this.roles = user.roles || [Role.USER, Role.ADMIN];
  }

  static exec() {
    return MyDatabase.getDb();
  }

  static close() {
    MyDatabase.close();
  }
}

export interface IUser {
  _id?: string;
  sid?: string;
  username: string;
  password: string;
  email: string;
  emailVerified: boolean;
  name: string;
  surname: string;
  followers: [];
  followings: [];
  favoritePlaces: [];
  favoriteTripes: [];
  activeTripes: [];
  provider: Provider;
  isActive: boolean;
  blocked: boolean;
  roles: string[];
  imageUrl?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt: Date;
}

type Provider = "apple" | "google" | "facebook" | "github" | "local";
