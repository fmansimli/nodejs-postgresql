import { RequestHandler } from "express";
import { City, ICity, ObjectId } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 5, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const total = await City.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);
    const cities = await City.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { cities },
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
  const { fields } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const _id = new ObjectId(req.params.id);
    const city = await City.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { city },
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
  const data = req.body as ICity;
  const city = new City(data);

  try {
    const data = await City.exec().insertOne(city);
    city._id = data.insertedId;

    res.status(201).json({
      body: { city: data.acknowledged ? city : undefined },
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
    const city = req.body as ICity;
    const _id = new ObjectId(req.params.id);

    const data = await City.exec().updateOne({ _id }, { $set: city });
    city._id = _id;

    res.status(200).json({
      body: { city: data.modifiedCount > 0 ? city : undefined },
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

    const data = await City.exec().deleteOne({ _id });

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
