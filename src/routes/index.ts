import { Router } from "express";
import authRouter from "./auth";
import accountRouter from "./account";
import usersRouter from "./users";
import adminRouter from "./admin";

const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/users", usersRouter);

router.use("/admiin", adminRouter);

export default router;
