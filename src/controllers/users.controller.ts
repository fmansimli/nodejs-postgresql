import { RequestHandler } from "express";
import { User, IUser } from "../models";
import { Parser } from "../utils";

export const getAll: RequestHandler = async (req, res, next) => {
  const { limit = 5, page = 1, fields, ...query } = req.query;
  const projection = Parser.project(fields as string);

  try {
    res.status(200).json({
      body: { users: [] },
      pagination: {},
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
    res.status(200).json({
      body: { user: {} },
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
    res.status(201).json({
      body: { user: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (req, res, next) => {
  const user = req.body as IUser;

  try {
    res.status(200).json({
      body: { user: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
        effected: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
        effected: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
