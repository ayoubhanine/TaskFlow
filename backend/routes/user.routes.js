import express from "express";

import {
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/user.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { updateUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.use(protect);

router.use(authorize("admin"));

router.get("/", getAll);

router.get("/:id", getOne);

router.put(
  "/:id",
  validate(updateUserSchema),
  update
);

router.delete("/:id", remove);

export default router;