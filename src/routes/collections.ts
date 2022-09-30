import { Router } from "express";
import * as collections from "../controllers/collections.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), collections.getAll);
router.get("/:id", Access.authorize(), collections.getById);

router.post("/", Access.authorize(Role.ADMIN), collections.create);

router.put("/:id", Access.authorize(Role.ADMIN), collections.updateById);

router.delete("/:id", Access.authorize(Role.ADMIN), collections.deleteById);

export default router;
