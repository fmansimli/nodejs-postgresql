import { RequestHandler } from "express";
import { IPoint, IPolygon } from "../interfaces";
import { Place, ObjectId, IPlace } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 5, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);

  try {
    const total = await Place.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);
    const places = await Place.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { places },
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

export const searchByKeyword: RequestHandler = async (req, res, next) => {
  const { limit = 5, fields, name } = req.query;
  const projection = Parser.project(fields as string);

  try {
    const places = await Place.exec()
      .find({ name: { $regex: new RegExp(`${name}`, "i") } })
      .project(projection)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { places },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNearBy: RequestHandler = async (req, res, next) => {
  const { lat = 0, long = 0, fields = "name,distance" } = req.query;
  const { min, max } = req.params;
  const projection = Parser.project(fields as string);

  const point: IPoint = {
    type: "Point",
    coordinates: [+long, +lat],
  };

  try {
    const places = await Place.exec()
      .aggregate([
        {
          $geoNear: {
            near: point,
            maxDistance: +max,
            minDistance: +min,
            distanceField: "distance",
          },
        },
        { $project: projection },
      ])
      .toArray();

    res.status(200).json({
      body: { places },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllinPolygon: RequestHandler = async (req, res, next) => {
  const { fields } = req.query;
  const polygon = req.body.polygon as IPolygon;

  const projection = Parser.project(fields as string);

  try {
    const places = await Place.exec()
      .find({
        location: {
          $geoWithin: { $geometry: polygon },
        },
      })
      .project(projection)
      .toArray();

    res.status(200).json({
      body: { places },
      meta: {
        ok: true,
        url: req.originalUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  const { fields } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const _id = new ObjectId(req.params.id);
    const place = await Place.exec().findOne({ _id }, { projection });
    res.status(200).json({
      body: { place },
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
  const data = req.body as IPlace;
  const place = new Place(data);

  try {
    const data = await Place.exec().insertOne(place);
    place._id = data.insertedId;

    res.status(201).json({
      body: { place },
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
  try {
    const place = new Place(req.body);
    const _id = new ObjectId(req.params.id);

    const data = await Place.exec().updateOne({ _id }, { $set: place });
    place._id = _id;

    res.status(200).json({
      body: { place: data.modifiedCount > 0 ? place : undefined },
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

export const editById: RequestHandler = async (req, res, next) => {
  try {
    const place = new Place(req.body);
    const _id = new ObjectId(req.params.id);

    const data = await Place.exec().updateOne({ _id }, { $set: place });
    place._id = _id;

    res.status(200).json({
      body: { place: data.modifiedCount > 0 ? place : undefined },
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

    const data = await Place.exec().deleteOne({ _id });

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
