import { RequestHandler } from "express";
import { IEvent, Event, ObjectId } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 5, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const total = await Event.exec().countDocuments(query);
    const pagination = Parser.paginate(total, +limit, +page);
    const invitations = await Event.exec()
      .find(query)
      .project(projection)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .toArray();

    res.status(200).json({
      body: { invitations },
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
    const invitation = await Event.exec().findOne({ _id }, { projection });

    res.status(200).json({
      body: { invitation },
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
  const data = req.body as IEvent;
  const invitation = new Event(data);

  try {
    const data = await Event.exec().insertOne(invitation);
    invitation._id = data.insertedId;

    res.status(201).json({
      body: { invitation: data.acknowledged ? invitation : undefined },
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
    const inv = req.body as IEvent;
    const _id = new ObjectId(req.params.id);

    const data = await Event.exec().updateOne({ _id }, { $set: inv });
    inv._id = _id;

    res.status(200).json({
      body: { invitation: data.modifiedCount > 0 ? inv : undefined },
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

    const data = await Event.exec().deleteOne({ _id });

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
