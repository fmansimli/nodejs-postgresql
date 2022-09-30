import { Router } from "express";
import * as areas from "../controllers/areas.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), areas.getAll);
router.get("/:id", Access.authorize(), areas.getById);
router.get("/:id/places", Access.authorize(), areas.getPlacesInPolygon);

router.post("/", Access.authorize(), areas.create);

router.put("/:id", Access.authorize(), areas.updateById);

router.delete("/:id", Access.authorize(Role.USER), areas.deleteById);

export default router;
