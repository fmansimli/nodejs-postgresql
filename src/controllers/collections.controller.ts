import { RequestHandler } from "express";
import { Collection, ICollection, ObjectId } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 5, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const total = await Collection.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);
    const collections = await Collection.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { collections },
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
    const collection = await Collection.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { collection },
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
  const data = req.body as ICollection;
  const collection = new Collection(data);

  try {
    const data = await Collection.exec().insertOne(collection);
    collection._id = data.insertedId;

    res.status(201).json({
      body: { collection },
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
    const collection = new Collection(req.body);
    const _id = new ObjectId(req.params.id);

    const data = await Collection.exec().updateOne(
      { _id },
      { $set: collection },
    );
    collection._id = _id;

    res.status(200).json({
      body: { collection: data.modifiedCount > 0 ? collection : undefined },
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

    const data = await Collection.exec().deleteOne({ _id });

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
