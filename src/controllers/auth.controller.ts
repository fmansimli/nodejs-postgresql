import { RequestHandler } from "express";
import { IUser, User } from "../models";
import { TokenManager, Password } from "../utils";
import { Errors, Messages } from "../enums";

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as IUser;
  const agent = req.headers["user-agent"];
  const ip = req.ip;

  try {
    const user: any = { email, password };

    if (!user) {
      throw { httpCode: 400, name: Errors.WRONG_CREDENTIALS };
    }
    if (!(await Password.compare(user.password, password))) {
      throw { httpCode: 400, name: Errors.WRONG_CREDENTIALS };
    }

    const { password: _pwd, ...others } = user;

    const tokens = await TokenManager.createTokens(
      {
        _id: user._id,
        roles: user.roles,
      },
      { agent, ip },
    );

    res.status(200).json({
      body: { user: others, auth: tokens },
      meta: {
        ok: true,
        message: Messages.SIGNED_IN,
        url: req.originalUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  const { email, password, username }: IUser = req.body;
  const agent = req.headers["user-agent"];
  const ip = req.ip;
  try {
    const exists = true;

    if (exists) {
      throw { httpCode: 400, name: Errors.ALREADY_EXISTS };
    }
    const hashed = await Password.toHash(password);
    const user = new User({
      username,
      password: hashed,
      email,
    } as IUser);

    const tokens = await TokenManager.createTokens(
      {
        _id: user._id,
        roles: user.roles,
      },
      { agent, ip },
    );

    res.status(201).json({
      body: { user, auth: tokens },
      meta: {
        ok: true,
        message: Messages.REGISTERED,
        url: req.originalUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
