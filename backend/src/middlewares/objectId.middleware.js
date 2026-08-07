import mongoose from "mongoose";
import { errorResponse } from "../utils/response.js";

const validateObjectId = (param = "id") => {
  return (req, res, next) => {
    const id = req.params[param];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(
        res,
        "Invalid ObjectId",
        400
      );
    }

    next();
  };
};

export default validateObjectId;