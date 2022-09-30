import http from "http";

import app from "./app";
import { MyDatabase, AppConfig } from "./config";

AppConfig.initialize();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  try {
    await MyDatabase.ping();
    console.log("@@@@ mongodb connected!");
  } catch (error: any) {
    console.log(`$$$ db connection error! (${error.messsage})`);
  } finally {
    console.log(`@@@@ server is running on http://localhost:${PORT} ...`);
  }
});
