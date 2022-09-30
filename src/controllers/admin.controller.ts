import { RequestHandler } from "express";
import { MyDatabase } from "../config";
import { Errors, Messages } from "../enums";

export const dropDatabase: RequestHandler = async (req, res, next) => {
  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }

    await MyDatabase.dropDatabase(req.body.name);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.DATABASE_DROPPED, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const dropColl: RequestHandler = async (req, res, next) => {
  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }

    await MyDatabase.dropTable(req.body.name);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.TABLE_DROPPED, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const createIndex: RequestHandler = async (req, res, next) => {
  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }
    await MyDatabase.createIndex(req.body);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.INDEX_CREATED, ok: true },
    });
  } catch (error) {
    next(error);
  }
};
