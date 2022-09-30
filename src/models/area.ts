import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { IPolygon } from "../interfaces";
import { CollectionNames } from "../enums";

export class Area implements IArea {
  public _id?: ObjectId;
  public name: string;
  public description: string;
  public location: IPolygon;
  public isActive: boolean;
  public createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(a: IArea) {
    this.name = a.name;
    this.description = a.description;
    this.location = a.location;
    this.updatedAt = new Date();
    this.isActive = a.isActive || true;
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.AREAS);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface IArea {
  _id?: ObjectId;
  name: string;
  description: string;
  location: IPolygon;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
