import express from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin", "analyst", "viewer"), getSummary);

export default router;