import Redis from "../redis/client";
import { RedisKeys } from "../enums";

const redis = Redis.getClient();

export class Session implements ISession {
  uid: string;
  tid: string;
  agent?: string;
  ip?: string;
  iat?: number;
  exp?: number;
  deviceName?: string;
  deviceId?: string;
  location?: string;
  info?: string;

  constructor(s: ISession) {
    this.uid = s.uid;
    this.tid = s.tid;
    this.agent = s.agent;
    this.ip = s.ip;
    this.iat = s.iat;
    this.exp = s.exp;
    this.deviceId = s.deviceId;
    this.location = s.location;
    this.info = s.info;
  }

  static async delete(userId: string, tokenId: string) {
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

  static async getAll(userId: string) {
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

  async save() {
    const data = await redis.hGet(this.uid, RedisKeys.SESSIONS);
    if (data) {
      const mysessions = JSON.parse(data) as ISession[];
      mysessions.push(this);
      await redis.hSet(
        this.uid,
        RedisKeys.SESSIONS,
        JSON.stringify(mysessions),
      );
    } else {
      await redis.hSet(this.uid, RedisKeys.SESSIONS, JSON.stringify([this]));
    }
  }

  static async checkTokenId(uid: string, tokenId: string) {
    const data = await redis.hGet(uid, RedisKeys.SESSIONS);
    if (data) {
      const sessions = JSON.parse(data);
      return sessions.some((session: ISession) => session.tid === tokenId);
    }
    return false;
  }
}

export interface ISession {
  uid: string;
  tid: string;
  agent?: string;
  ip?: string;
  iat?: number;
  exp?: number;
  deviceName?: string;
  deviceId?: string;
  location?: string;
  info?: string;
}
