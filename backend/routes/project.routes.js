import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/project.controller.js";

import { protect,authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProjectSchema } from "../validators/project.validator.js";

const router = express.Router();


router.post(
  "/",  protect,
  authorize("admin", "manager"),
  validate(createProjectSchema),
  create
);
router.get("/",protect, getAll);
router.get("/:id",protect, getOne);
router.put("/:id",protect ,update);
router.delete("/:id",protect, remove);

export default router;