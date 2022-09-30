import Redis from "../redis/client";
import { ISession } from "../interfaces/auth";
import { RedisKeys } from "../enums";

const redis = Redis.getClient();

export class SessionManager {
  static async delSession(userId: string, tokenId: string) {
    const data = await redis.hGet(userId, RedisKeys.SESSIONS);
    if (data) {
      const sessions = JSON.parse(data);
      const newSessions = sessions.filter((s: ISession) => s.tid !== tokenId);
      await redis.hSet(userId, RedisKeys.SESSIONS, JSON.stringify(newSessions));
    }
    return false;
  }

  static async flushAll(userId: string) {
    await redis.hDel(userId, RedisKeys.SESSIONS);
  }

  static async logoutOthers(uid: string, tid: string) {
    const data = await redis.hGet(uid, RedisKeys.SESSIONS);
    if (data) {
      let sessions = JSON.parse(data);
      sessions = sessions.filter((s: ISession) => s.tid == tid);
      await redis.hSet(uid, RedisKeys.SESSIONS, JSON.stringify(sessions));
    }
  }

  static async getSessions(userId: string) {
    const data = await redis.hGet(userId, RedisKeys.SESSIONS);
    if (data) return JSON.parse(data);
    return [];
  }

  static async getSession(userId: string, tid: string) {
    const data = await redis.hGet(userId, RedisKeys.SESSIONS);
    if (data) {
      const sessions = JSON.parse(data);
      return sessions.find((s: ISession) => s.tid === tid);
    }
    return null;
  }

  static async addToken(uid: string, session: ISession) {
    const data = await redis.hGet(uid, RedisKeys.SESSIONS);
    if (data) {
      const mysessions = JSON.parse(data) as ISession[];
      mysessions.push(session);
      await redis.hSet(uid, RedisKeys.SESSIONS, JSON.stringify(mysessions));
    } else {
      await redis.hSet(uid, RedisKeys.SESSIONS, JSON.stringify([session]));
    }
  }

  static async checkTokenId(userId: string, tokenId: string) {
    const data = await redis.hGet(userId, RedisKeys.SESSIONS);
    if (data) {
      const sessions = JSON.parse(data);
      return sessions.some((session: ISession) => session.tid === tokenId);
    }
    return false;
  }
}
