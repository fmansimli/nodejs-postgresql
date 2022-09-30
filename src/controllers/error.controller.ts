import { join } from "path";
import { RequestHandler, ErrorRequestHandler } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Errors } from "../enums";

export const get404: RequestHandler = (req, res, next) => {
  if (req.headers["device-type"] === "WEB") {
    res.status(404).sendFile(join(__dirname, "../", "public", "index.html"));
  } else {
    res.status(404).json({
      error: {
        httpCode: 404,
        message: "not found!",
        name: Errors.NOT_FOUND,
      },
      meta: {
        url: req.originalUrl,
        ok: false,
      },
    });
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  const httpCode = err.httpCode ? err.httpCode : 500;
  if (err.name === Errors.VALIDATION_ERROR) {
    res.status(422).json({
      error: {
        httpCode: 422,
        errors: err?.errors || [],
        message: err.message || undefined,
        name: Errors.VALIDATION_ERROR,
      },
      meta: {
        url: req.originalUrl,
        ok: false,
      },
    });
  } else if (err instanceof TokenExpiredError) {
    res.status(401).json({
      error: {
        httpCode: 401,
        name: Errors.TOKEN_EXPIRED,
      },
      meta: {
        url: req.originalUrl,
        ok: false,
      },
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      error: {
        httpCode: 401,
        name: Errors.TOKEN_MALFORMED,
      },
      meta: {
        url: req.originalUrl,
        ok: false,
      },
    });
  } else {
    res.status(httpCode).json({
      error: {
        httpCode,
        codeName: err.codeName || undefined,
        message: err.message,
        name: err.name || Errors.UNKNOWN_ERROR,
      },
      meta: {
        url: req.originalUrl,
        ok: false,
      },
    });
  }
};
