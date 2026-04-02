import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../validations/validate.js";
import { recordSchema } from "../validations/record.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validate(recordSchema),
  createRecord
);

router.get("/", protect, authorizeRoles("admin", "analyst"), getRecords);

router.patch(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validate(recordSchema),
  updateRecord
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

export default router;