import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validateMiddleware from "../../middlewares/validate.middleware.js";
import validateObjectId from "../../middlewares/objectId.middleware.js";

import {
  createRationCardSchema,
  updateRationCardSchema,
  addFamilyMemberSchema,
  updateFamilyMemberSchema,
  beneficiaryRegisterSchema,
} from "./rationCard.validation.js";

import {
  createRationCard,
  updateRationCard,
  deleteRationCard,
  getCard,
  getCards,
  searchRationCards,
  addMember,
  updateMember,
  deleteMember,
  getBeneficiaryRegisterController,
} from "./rationCard.controller.js";

const router = Router();

/**
 * Create Ration Card
 */
router.post(
  "/",
  authMiddleware,
  validateMiddleware(createRationCardSchema),
  createRationCard
);

/**
 * Search Ration Cards
 */
router.get(
  "/search",
  authMiddleware,
  searchRationCards
);

/**
 * Get All Ration Cards
 */
router.get(
  "/",
  authMiddleware,
  getCards
);

/**
 * Beneficiary Register
 */
router.get(
  "/register/beneficiaries",
  authMiddleware,
  validateMiddleware(
    beneficiaryRegisterSchema,
    "query"
  ),
  getBeneficiaryRegisterController
);

/**
 * Get Single Ration Card
 */
router.get(
  "/:id",
  authMiddleware,
  validateObjectId(),
  getCard
);

router.post(
    "/:id/member",
    authMiddleware,
    validateObjectId(),
    validateMiddleware(
        addFamilyMemberSchema
    ),
    addMember
);

router.put(
  "/:id/member/:memberId",
  authMiddleware,
  validateObjectId("id"),
  validateObjectId("memberId"),
  validateMiddleware(
    updateFamilyMemberSchema
  ),
  updateMember
);

router.delete(
  "/:id/member/:memberId",
  authMiddleware,
  validateObjectId("id"),
  validateObjectId("memberId"),
  deleteMember
);

/**
 * Update Ration Card
 */
router.put(
  "/:id",
  authMiddleware,
  validateMiddleware(updateRationCardSchema),
  updateRationCard
);

/**
 * Delete Ration Card
 */
router.delete(
  "/:id",
  authMiddleware,
  deleteRationCard
);

export default router;