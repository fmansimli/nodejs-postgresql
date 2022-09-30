import { Router } from "express";
import * as cities from "../controllers/cities.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), cities.getAll);
router.get("/:id", Access.authorize(), cities.getById);

router.post("/", Access.authorize(Role.ADMIN), cities.create);

router.put("/:id", Access.authorize(Role.ADMIN), cities.updateById);

router.delete("/:id", Access.authorize(Role.ADMIN), cities.deleteById);

export default router;
