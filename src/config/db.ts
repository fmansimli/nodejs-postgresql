class MyDatabase {
  static getDb(dbname?: string) {
    return dbname;
  }

  static async close() {
    return;
  }

  static ping = async (dbname?: string) => {
    return dbname;
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

export default MyDatabase;
