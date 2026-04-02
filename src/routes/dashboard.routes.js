import express from "express";
import { getSummary, monthlyTrends } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin", "analyst", "viewer"), getSummary);
router.get("/monthly", protect, monthlyTrends);

export default router;