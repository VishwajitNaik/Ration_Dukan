import { successResponse, errorResponse, } from "../../utils/response.js";
import { createOwner, findOwnerByMobile, ownerExists, } from "../owner/owner.service.js";
import { generateToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword, } from "../../utils/bcrypt.js";

export const register = async (req, res, next) => {
  try {

    const data = req.validatedData;

    const existingOwner = await ownerExists(
      data.mobile,
      data.email
    );

    if (existingOwner) {
      return errorResponse(
        res,
        "Mobile or Email already registered",
        409
      );
    }

    data.password = await hashPassword(data.password);

    const owner = await createOwner(data);

    const token = generateToken({
      sub: owner._id.toString(),
      role: owner.role,
    });

    return successResponse(
      res,
      "Owner registered successfully",
      {
        owner,
        token,
      },
      201
    );

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {

    const { mobile, password } = req.validatedData;

    const owner = await findOwnerByMobile(mobile);

    if (!owner) {
      return errorResponse(
        res,
        "Invalid mobile number or password",
        401
      );
    }

    const isPasswordCorrect = await comparePassword(
      password,
      owner.password
    );

    if (!isPasswordCorrect) {
      return errorResponse(
        res,
        "Invalid mobile number or password",
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

    const token = generateToken({
      sub: owner._id.toString(),
      role: owner.role,
    });

    return successResponse(
      res,
      "Login successful",
      {
        owner,
        token,
      }
    );

  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {

    return successResponse(
      res,
      "Profile fetched successfully",
      req.owner
    );

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return successResponse(
      res,
      "Logout Successful"
    );
  } catch (error) {
    next(error);
  }
};

// import { successResponse } from "../../utils/response.js";

// export const register = async (req, res) => {
//   return successResponse(
//     res,
//     "Register API Coming Soon"
//   );
// };

// export const login = async (req, res) => {
//   return successResponse(
//     res,
//     "Login API Coming Soon"
//   );
// };

// export const logout = async (req, res) => {
//   return successResponse(
//     res,
//     "Logout API Coming Soon"
//   );
// };