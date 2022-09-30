import { ObjectId } from "mongodb";
import { MyDatabase } from "../config";
import { CollectionNames } from "../enums";

export class Event implements IEvent {
  _id?: ObjectId;
  title: string;
  description: string;
  from: ObjectId;
  trip: ObjectId;
  guests: ObjectId[];
  applicants: ObjectId[];
  users: ObjectId[];
  createdAt: Date = new Date();
  updatedAt: Date;
  isActive: boolean;

  constructor(e: Event) {
    this.from = e.from;
    this.title = e.title;
    this.description = e.description;
    this.guests = e.guests || [];
    this.applicants = e.applicants || [];
    this.users = e.users || [];
    this.isActive = e.isActive || true;
    this.trip = e.trip;
    this.updatedAt = new Date();
  }

  static exec() {
    return MyDatabase.getDb().collection(CollectionNames.EVENTS);
  }

  static close() {
    MyDatabase.close();
  }
}

export interface IEvent {
  _id?: ObjectId;
  title: string;
  description: string;
  from: ObjectId;
  trip: ObjectId;
  guests: ObjectId[];
  applicants: ObjectId[];
  users: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
