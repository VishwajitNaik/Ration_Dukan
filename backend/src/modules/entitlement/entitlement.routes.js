import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";
import validateObjectId from "../../middlewares/objectId.middleware.js";

import {
  createEntitlementSchemeSchema,
  updateEntitlementSchemeSchema,
} from "./entitlement.validation.js";

import {
  createEntitlementScheme,
  getEntitlementSchemes,
  updateEntitlementScheme,
  deleteEntitlementScheme,
} from "./entitlement.controller.js";

const router = Router();

/**
 * Create Scheme
 */
router.post(
  "/schemes",
  authMiddleware,
  validateMiddleware(
    createEntitlementSchemeSchema
  ),
  createEntitlementScheme
);

/**
 * List Schemes
 */
router.get(
  "/schemes",
  authMiddleware,
  getEntitlementSchemes
);

/**
 * Update Scheme
 */
router.put(
  "/schemes/:id",
  authMiddleware,
  validateObjectId(),
  validateMiddleware(
    updateEntitlementSchemeSchema
  ),
  updateEntitlementScheme
);

/**
 * Delete Scheme
 */
router.delete(
  "/schemes/:id",
  authMiddleware,
  validateObjectId(),
  deleteEntitlementScheme
);

export default router;