import { RequestHandler } from "express";
import { ITrip, ObjectId, Trip } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { limit = 5, page = 1, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);

  try {
    const total = await Trip.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);

    const trips = await Trip.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { trips },
      pagination,
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  const projection = Parser.project(req.query.fields as string);
  try {
    const _id = new ObjectId(req.params.id);
    const trip = await Trip.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { trip },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const body = req.body as ITrip;
  const trip = new Trip(body);

  try {
    const data = await Trip.exec().insertOne(trip);
    trip._id = data.insertedId;

    res.status(201).json({
      body: { trip: data.acknowledged ? trip : undefined },
      meta: {
        url: req.originalUrl,
        ok: data.acknowledged,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (req, res, next) => {
  const trip = req.body as ITrip;

  try {
    const _id = new ObjectId(req.params.id);
    const data = await Trip.exec().updateOne({ _id }, { $set: trip });
    trip._id = _id;

    res.status(200).json({
      body: { trip: data.modifiedCount ? trip : undefined },
      meta: {
        url: req.originalUrl,
        ok: data.acknowledged,
        effected: data.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addDestination: RequestHandler = async (req, res, next) => {
  const update = req.body as ITrip;

  try {
    const _id = new ObjectId(req.params.id);
    const data = await Trip.exec().updateOne({ _id }, { $set: update });
    update._id = _id;

    res.status(200).json({
      body: { trip: data.modifiedCount ? update : undefined },
      meta: {
        url: req.originalUrl,
        ok: data.acknowledged,
        effected: data.modifiedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const _id = new ObjectId(req.params.id);
    const data = await Trip.exec().deleteOne({ _id });

    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: data.acknowledged,
        effected: data.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
