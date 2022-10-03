import { sign, decode, verify } from "jsonwebtoken";
import { randomBytes } from "crypto";

const secret = String(process.env.JWT_SECRET);

export class TokenManager {
  static async createTokens(payload: any) {
    const tid = randomBytes(4).toString("hex");

    const accessToken = sign({ ...payload, tid }, secret, { expiresIn: "1h" });
    const refreshToken = sign({ ...payload, tid }, secret, { expiresIn: "1d" });
    const { iat, exp }: any = decode(accessToken);

    return { accessToken, refreshToken, extra: { iat, tid, exp } };
  }

  static async createToken(payload: any, expiresIn = "1h") {
    const accessToken = sign(payload, secret, { expiresIn });
    return accessToken;
  }

  static decode(token: string) {
    return decode(token);
  }

  static verify(token: string) {
    return verify(token, secret);
  }
}
