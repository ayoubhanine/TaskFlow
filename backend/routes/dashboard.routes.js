
import express from "express";
import { getStats,getTaskStats } from "../controllers/dashboard.controller.js";
import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getStats);
router.get(
  "/task-stats",
  protect,
  authorize("admin", "manager", "member"),
  getTaskStats
);

export default router;