import { RequestHandler } from "express";
import { IUser, Session, User } from "../models";
import { TokenManager, Password } from "../utils";
import { Errors, Messages } from "../enums";

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as IUser;
  const agent = req.headers["user-agent"];
  const ip = req.ip;

  try {
    const user: any = { email, password, id: 1 };

    if (!user) {
      throw { httpCode: 400, name: Errors.WRONG_CREDENTIALS };
    }
    if (!(await Password.compare(user.password, password))) {
      throw { httpCode: 400, name: Errors.WRONG_CREDENTIALS };
    }

    const { password: _pwd, ...others } = user;

    const payload = { id: user.id, roles: user.roles };
    const { extra, ...tokens } = await TokenManager.createTokens(payload);

    const session = new Session({ uid: user.id, ip, agent, ...extra });
    await session.save();

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
    const user = { id: "1", username, password: hashed, email };

    const payload = { id: user.id, roles: [] };
    const { extra, ...tokens } = await TokenManager.createTokens(payload);

    const session = new Session({ uid: user.id, ip, agent, ...extra });
    await session.save();

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
