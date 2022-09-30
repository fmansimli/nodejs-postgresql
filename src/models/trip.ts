import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { CollectionNames } from "../enums";

export class Trip implements ITrip {
  public _id?: ObjectId;
  public title: string;
  public description: string;
  public owner: ObjectId;
  public destinations: ObjectId[];
  public travelers: ObjectId[];
  public isActive: boolean;
  public scheduledDate: Date;
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(t: ITrip) {
    this.title = t.title;
    this.owner = t.owner;
    this.isActive = t.isActive;
    this.description = t.description;
    this.scheduledDate = t.scheduledDate;
    this.updatedAt = new Date();
    this.destinations = t.destinations || [];
    this.travelers = t.travelers || [];
    this.isActive = t.isActive || true;
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.TRIPES);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface ITrip {
  _id?: ObjectId;
  title: string;
  description: string;
  owner: ObjectId;
  destinations: ObjectId[];
  travelers: ObjectId[];
  isActive: boolean;
  scheduledDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
