import { RequestHandler } from "express";
import { User, ObjectId, IUser } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { limit = 5, page = 1, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);

  try {
    const total = await User.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);

    const users = await User.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { users },
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
    const user = await User.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { user },
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
  const body = req.body as IUser;
  const user = new User(body);

  try {
    const data = await User.exec().insertOne(user);
    user._id = data.insertedId;

    res.status(201).json({
      body: { user: data.acknowledged ? user : undefined },
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
  const user = req.body as IUser;

  try {
    const _id = new ObjectId(req.params.id);
    const data = await User.exec().updateOne({ _id }, { $set: user });
    user._id = _id;

    res.status(200).json({
      body: { user: data.modifiedCount ? user : undefined },
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
    const data = await User.exec().deleteOne({ _id });

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
