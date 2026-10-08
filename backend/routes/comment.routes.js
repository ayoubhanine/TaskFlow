import express from "express";

import {
  create,
  getByTask,
  getOne,
  update,
  remove,
} from "../controllers/comment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
  createCommentSchema,
  updateCommentSchema,
} from "../validators/comment.validator.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  validate(createCommentSchema),
  create
);

router.get("/task/:taskId", getByTask);

router.get("/:id", getOne);

router.put(
  "/:id",
  validate(updateCommentSchema),
  update
);

router.delete("/:id", remove);

export default router;