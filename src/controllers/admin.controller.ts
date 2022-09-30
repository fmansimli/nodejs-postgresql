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
    const db = MyDatabase.getDb();
    await db.dropDatabase();

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.DATABASE_DROPPED },
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
    const db = MyDatabase.getDb();
    const resp = await db.dropCollection(req.body.name);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.COLLECTION_DROPPED, ok: resp },
    });
  } catch (error) {
    next(error);
  }
};

export const createIndex: RequestHandler = async (req, res, next) => {
  const { collection, ...rest } = req.body;

  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }
    const db = MyDatabase.getDb();
    await db.collection(collection).createIndex(rest);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.INDEX_CREATED },
    });
  } catch (error) {
    next(error);
  }
};
