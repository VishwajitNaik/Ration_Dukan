  import { Router } from "express";

import { successResponse } from "./utils/response.js";

import authRoutes from "./modules/auth/auth.routes.js";
import rationCardRoutes from "./modules/rationCard/rationCard.routes.js";
import stockRoutes from "./modules/stock/stock.routes.js";
import distributionRoutes from "./modules/distribution/distribution.routes.js";
import reportsRoutes from "./modules/reports/reports.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import exportRoutes from "./modules/export/export.routes.js";
import auditRoutes from "./modules/audit/audit.routes.js";
import entitlementRoutes from "./modules/entitlement/entitlement.routes.js";


const router = Router();

router.get("/", (req, res) => {
  return successResponse(
    res,
    "Ration Dukan API Running"
  );
});

router.use("/auth", authRoutes);
router.use("/ration-cards", rationCardRoutes);
router.use("/stock", stockRoutes);
router.use("/distribution", distributionRoutes);
router.use("/reports", reportsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/export", exportRoutes);
router.use("/audit", auditRoutes);
router.use("/entitlements", entitlementRoutes);

export default router;
