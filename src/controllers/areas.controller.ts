import { RequestHandler } from "express";
import { Area, IArea, ObjectId, Place } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 5, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const total = await Area.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);
    const areas = await Area.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { areas },
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

export const getPlacesInPolygon: RequestHandler = async (req, res, next) => {
  const { fields } = req.query;
  const projection = Parser.project(fields as string);

  try {
    const _id = new ObjectId(req.params.id);
    const area = await Area.exec().findOne({ _id });
    let places: Place[] = [];
    if (area) {
      places = (await Place.exec()
        .find({
          location: {
            $geoWithin: { $geometry: area.location },
          },
        })
        .project(projection)
        .toArray()) as Place[];
    }

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
    const area = await Area.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { area },
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
  const data = req.body as IArea;
  const area = new Area(data);

  try {
    const data = await Area.exec().insertOne(area);
    area._id = data.insertedId;

    res.status(201).json({
      body: { area: data.acknowledged ? area : undefined },
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
    const area = req.body as IArea;
    const _id = new ObjectId(req.params.id);

    const data = await Area.exec().updateOne({ _id }, { $set: area });
    area._id = _id;

    res.status(200).json({
      body: { area: data.modifiedCount > 0 ? area : undefined },
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

    const data = await Area.exec().deleteOne({ _id });

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
