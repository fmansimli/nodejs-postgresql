import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { CollectionNames } from "../enums";
import { IPoint } from "../interfaces";

export class Place implements IPlace {
  public _id?: ObjectId;
  public name: string;
  public address: string;
  public location: IPoint;
  public city: ObjectId;
  public imageUrl?: string;
  public images?: string[];
  public score?: number;
  public isActive: boolean;
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(p: IPlace) {
    this.address = p.address;
    this.city = p.city;
    this.location = p.location;
    this.name = p.name;
    this.updatedAt = new Date();
    this.score = p.score;
    this.isActive = p.isActive || true;
    this.imageUrl = p.imageUrl;
    this.images = p.images || [];
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.PLACES);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface IPlace {
  _id?: ObjectId;
  name: string;
  address: string;
  location: IPoint;
  city: ObjectId;
  imageUrl?: string;
  images?: string[];
  score?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
