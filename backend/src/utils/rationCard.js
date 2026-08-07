import { errorResponse } from "./response.js";

export const validateRationCard = (
  res,
  rationCard
) => {

  if (!rationCard) {
    return errorResponse(
      res,
      "Ration Card not found",
      404
    );
  }

  if (rationCard.isDeleted) {
    return errorResponse(
      res,
      "Ration Card has been deleted",
      404
    );
  }

  if (rationCard.cardStatus !== "ACTIVE") {
    return errorResponse(
      res,
      "Ration Card is not active",
      409
    );
  }

  return null;

};