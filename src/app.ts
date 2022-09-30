import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";

import { errorHandler, get404 } from "./controllers/error.controller";
import indexRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(process.cwd(), "public")));

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    allowedHeaders: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
    origin: ["*"],
    optionsSuccessStatus: 200,
  }),
);

app.use("/api", indexRouter);

app.use(get404);
app.use(errorHandler);

export default app;
