import {
  createScheme,
  getSchemes,
  updateScheme,
  deleteScheme,
} from "./entitlement.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const createEntitlementScheme =
  async (req, res, next) => {
    try {
      const scheme =
        await createScheme(
          req.validatedData
        );

      return successResponse(
        res,
        "Entitlement scheme created successfully",
        scheme,
        201
      );
    } catch (error) {
      next(error);
    }
  };

export const getEntitlementSchemes =
  async (req, res, next) => {
    try {
      const schemes =
        await getSchemes();

      return successResponse(
        res,
        "Entitlement schemes fetched successfully",
        schemes
      );
    } catch (error) {
      next(error);
    }
  };

export const updateEntitlementScheme =
  async (req, res, next) => {
    try {
      const scheme =
        await updateScheme(
          req.params.id,
          req.validatedData
        );

      if (!scheme) {
        return errorResponse(
          res,
          "Entitlement scheme not found",
          404
        );
      }

      return successResponse(
        res,
        "Entitlement scheme updated successfully",
        scheme
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteEntitlementScheme =
  async (req, res, next) => {
    try {
      const scheme =
        await deleteScheme(
          req.params.id
        );

      if (!scheme) {
        return errorResponse(
          res,
          "Entitlement scheme not found",
          404
        );
      }

      return successResponse(
        res,
        "Entitlement scheme deleted successfully"
      );
    } catch (error) {
      next(error);
    }
  };