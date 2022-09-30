import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

client.on("error", error => {
  console.warn("redis comnection error!", error);
});

client.connect();

class Redis {
  static getClient() {
    return client;
  }
}

export default Redis;
