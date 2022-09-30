import { Router } from "express";
import * as events from "../controllers/events.controller";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), events.getAll);
router.get("/:id", Access.authorize(), events.getById);

router.post("/", Access.authorize(), events.create);

router.put("/:id", Access.authorize(), events.updateById);

router.delete("/:id", Access.authorize(), events.deleteById);

export default router;
