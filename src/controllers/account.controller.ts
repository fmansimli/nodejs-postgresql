import { RequestHandler } from "express";
import { IUser, User, Session } from "../models";
import { Parser } from "../utils";

export const getProfile: RequestHandler = async (req: any, res, next) => {
  const { fields } = req.query;
  const projection = Parser.project(fields as string);
  try {
    const id = req.user.id;

    const user = {};

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

export const updateProfile: RequestHandler = async (req: any, res, next) => {
  const body = req.body as IUser;
  try {
    const id = req.user.id;

    body.id = id;

    res.status(200).json({
      body: { user: body },
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

export const deleteProfile: RequestHandler = async (req: any, res, next) => {
  try {
    const id = req.user.id;

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

export const logout: RequestHandler = async (req: any, res, next) => {
  try {
    await Session.delete(req.user.id, req.user.tid);
    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSessions: RequestHandler = async (req: any, res, next) => {
  try {
    const sessions = await Session.getAll(req.user.id);
    res.status(200).json({
      body: { sessions, all: sessions.length },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSession: RequestHandler = async (req: any, res, next) => {
  try {
    const session = await Session.getSession(req.user.id, req.user.tid);
    res.status(200).json({
      body: { session },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionById: RequestHandler = async (req: any, res, next) => {
  const id = req.params.id;
  try {
    const session = await Session.getSession(req.user.id, id);
    res.status(200).json({
      body: { session },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const delSession: RequestHandler = async (req: any, res, next) => {
  try {
    await Session.delete(req.user.id, req.params.id);
    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const flushAllSession: RequestHandler = async (req: any, res, next) => {
  try {
    await Session.flushAll(req.user.id);
    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutOthers: RequestHandler = async (req: any, res, next) => {
  try {
    await Session.logoutOthers(req.user.id, req.user.tid);
    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};
