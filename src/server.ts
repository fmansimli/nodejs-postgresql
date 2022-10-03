import http from "http";

import app from "./app";
import { Db, AppConfig } from "./config";

AppConfig.initialize();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  try {
    const connectedAt = await Db.ping();
    console.log("@@@@ db connected at " + connectedAt);
  } catch (error: any) {
    console.log(`$$$ db connection error! (${error.messsage})`);
  } finally {
    console.log(`@@@@ server is running on http://localhost:${PORT} ...`);
  }
});
