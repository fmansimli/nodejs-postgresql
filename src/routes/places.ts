import { Router } from "express";
import * as places from "../controllers/places.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(), places.getAll);

router.get("/inpolygon", Access.authorize(), places.getAllinPolygon);

router.get("/search", Access.authorize(), places.searchByKeyword);

router.get("/nearby/:min/:max", Access.authorize(), places.getNearBy);

router.get("/:id", Access.authorize(), places.getById);

router.post("/", Access.authorize(Role.ADMIN), places.create);

router.put("/:id", Access.authorize(Role.ADMIN), places.updateById);
router.patch("/:id", Access.authorize(Role.ADMIN), places.editById);

router.delete("/:id", Access.authorize(Role.ADMIN), places.deleteById);

export default router;
