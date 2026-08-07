import { errorResponse } from "../utils/response.js";
import { verifyToken } from "../utils/jwt.js";
import { findOwnerById } from "../modules/owner/owner.service.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return errorResponse(
        res,
        "Authorization header is required",
        401
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return errorResponse(
        res,
        "Invalid authorization format",
        401
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const owner = await findOwnerById(decoded.sub);

    if (!owner) {
      return errorResponse(
        res,
        "Owner not found",
        401
      );
    }

    if (!owner.isActive) {
      return errorResponse(
        res,
        "Account has been deactivated",
        403
      );
    }

    req.owner = owner;

    next();
  } catch (error) {
    return errorResponse(
      res,
      "Invalid or expired token",
      401
    );
  }
};

export default authMiddleware;