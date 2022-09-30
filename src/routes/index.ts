import { Router } from "express";
import authRouter from "./auth";
import accountRouter from "./account";
import placesRouter from "./places";
import usersRouter from "./users";
import adminRouter from "./admin";
import cityRouter from "./cities";
import collectionRouter from "./collections";
import tripRouter from "./trips";
import areaRouter from "./areas";
import eventsRouter from "./events";

const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/places", placesRouter);
router.use("/users", usersRouter);
router.use("/cities", cityRouter);
router.use("/collections", collectionRouter);
router.use("/trips", tripRouter);
router.use("/areas", areaRouter);
router.use("/events", eventsRouter);

router.use("/admiin", adminRouter);

export default router;
