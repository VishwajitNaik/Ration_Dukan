import { successResponse, errorResponse } from "../../utils/response.js";
import { findOwnerById, updateOwner } from "./owner.service.js";

/**
 * Get Owner Profile
 */
export const getProfile = async (req, res, next) => {
  try {
    // const owner = await findOwnerById(req.owner._id);

    const owner = req.owner;

    if (!owner) {
      return errorResponse(res, "Owner not found", 404);
    }

    return successResponse(
      res,
      "Profile fetched successfully",
      owner
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Owner Profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const owner = await updateOwner(
      req.owner._id,
      req.body
    );

    return successResponse(
      res,
      "Profile updated successfully",
      owner
    );
  } catch (error) {
    next(error);
  }
};