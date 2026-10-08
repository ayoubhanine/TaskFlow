import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/task.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createTaskSchema } from "../validators/task.validator.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  authorize("admin", "manager"),
  validate(createTaskSchema),
  create
);

router.get("/", getAll);

router.get("/:id", getOne);

router.put("/:id", authorize("admin", "manager"), update);

router.delete(
  "/:id",
  authorize("admin", "manager"),
  remove
);

export default router;