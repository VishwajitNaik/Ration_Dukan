import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";

import {
  dashboardSchema,
} from "./dashboard.validation.js";

import {
  getDashboardController,
} from "./dashboard.controller.js";

const router = express.Router();

/**
 * FPS Dashboard
 */
router.get(
  "/",
  authMiddleware,
  validateMiddleware(
    dashboardSchema,
    "query"
  ),
  getDashboardController
);

export default router;