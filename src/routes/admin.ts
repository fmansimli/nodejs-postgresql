import { Router } from "express";
import * as admin from "../controllers/admin.controller";
import { Role } from "../enums";
import { Access } from "../middlewares";

const router = Router();

router.post("/create-index", Access.authorize(Role.ADMIN), admin.createIndex);

router.post("/drop-collection", Access.authorize(Role.ADMIN), admin.dropColl);

router.post("/drop-database", Access.authorize(Role.ADMIN), admin.dropDatabase);

export default router;
