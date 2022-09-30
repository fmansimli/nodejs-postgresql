import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { CollectionNames } from "../enums";

export class Collection implements ICollection {
  public _id?: ObjectId;
  public title: string;
  public description: string;
  public places: ObjectId[];
  public isActive: boolean;
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(c: ICollection) {
    this.description = c.description;
    this.title = c.title;
    this.places = c.places || [];
    this.updatedAt = new Date();
    this.isActive = c.isActive || true;
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.COLLECTIONS);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface ICollection {
  _id?: ObjectId;
  title: string;
  description: string;
  places: ObjectId[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
