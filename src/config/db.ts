import { Pool } from "pg";

const pool = new Pool({ idleTimeoutMillis: 0, max: 20 });

class Db {
  static async query(text: string, values: []) {
    const resp = await pool.query(text, values);
    return resp;
  }

  static async getClient() {
    const client = await pool.connect();
    return client;
  }

  static getPool() {
    return pool;
  }

  static async close() {
    return pool.end();
  }

  static ping = async () => {
    const resp = await pool.query("SELECT NOW()");
    return resp.rows[0].now;
  };

  static dropDatabase = async (dbname?: string) => {
    return dbname;
  };

  static dropTable = async (tableName?: string) => {
    return tableName;
  };

  static createIndex = async (conf: any) => {
    return conf;
  };
}

export default Db;
