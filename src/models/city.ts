import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { CollectionNames } from "../enums";

export class City implements ICity {
  public _id?: ObjectId;
  public name: string;
  public description: string;
  public isActive: boolean;
  public code: number;
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(c: ICity) {
    this.name = c.name;
    this.description = c.description;
    this.updatedAt = new Date();
    this.code = c.code;
    this.isActive = c.isActive || true;
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.CITIES);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface ICity {
  _id?: ObjectId;
  name: string;
  description: string;
  code: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
