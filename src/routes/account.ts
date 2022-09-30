import { Router } from "express";
import * as account from "../controllers/account.controller";
import { Access } from "../middlewares";

const router = Router();

router.get("/profile", Access.authorize(), account.getProfile);

router.put("/profile", Access.authorize(), account.updateProfile);

router.delete("/profile", Access.authorize(), account.deleteProfile);
router.delete("/logout", Access.authorize(), account.logout);

router.get("/sessions", Access.authorize(), account.getSessions);
router.get("/sessions/me", Access.authorize(), account.getSession);
router.get("/sessions/:id", Access.authorize(), account.getSessionById);

router.delete("/sessions", Access.authorize(), account.flushAllSession);
router.delete("/sessions/all", Access.authorize(), account.logoutOthers);
router.delete("/sessions/:id", Access.authorize(), account.delSession);

export default router;
