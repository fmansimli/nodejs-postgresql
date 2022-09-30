import { Router } from "express";
import * as trips from "../controllers/trips.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), trips.getAll);
router.get("/:id", Access.authorize(), trips.getById);

router.post("/", Access.authorize(), trips.create);

router.put("/:id", Access.authorize(), trips.updateById);

router.put("/:id/add-dest", Access.authorize(), trips.addDestination);

router.delete("/:id", Access.authorize(Role.USER), trips.deleteById);

export default router;
