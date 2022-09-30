import { Router } from "express";
import * as users from "../controllers/users.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.get("/", Access.authorize(Role.ADMIN), users.getAll);
router.get("/:id", Access.authorize(Role.ADMIN), users.getById);

router.post("/", Access.authorize(Role.ADMIN), users.create);

router.put("/:id", Access.authorize(Role.ADMIN), users.updateById);

router.delete("/:id", Access.authorize(Role.ADMIN), users.deleteById);

export default router;
