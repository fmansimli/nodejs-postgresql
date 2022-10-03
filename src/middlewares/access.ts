import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Role, Errors } from "../enums";
import { Session } from "../models";

const secret = process.env.JWT_SECRET as string;

export class Access {
  static authorize(role = Role.USER) {
    return async (req: any, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      try {
        if (token) {
          const { id, tid, roles = [] }: any = verify(token, secret);
          if (roles.includes(role)) {
            const exists = await Session.checkTokenId(id, tid);
            if (exists) {
              req.user = { id, tid, roles };
              return next();
            }
          } else {
            throw { httpCode: 403, name: Errors.ACCESS_DENIED };
          }
          throw { httpCode: 401, name: Errors.NO_SESSION_FOUND };
        }
        throw { httpCode: 401, name: Errors.NO_TOKEN_PROVIDED };
      } catch (error) {
        next(error);
      }
    };
  }
}
