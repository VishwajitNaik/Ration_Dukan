import { Router } from "express";

import validateMiddleware from "../../middlewares/validate.middleware.js";

import { registerOwnerSchema } from "../owner/owner.validation.js";
import { loginSchema } from "./auth.validation.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { successResponse } from "../../utils/response.js"; 
import {register, login, logout, me, } from "./auth.controller.js";

const router = Router();

router.post( "/register", validateMiddleware(registerOwnerSchema), register);
router.post( "/login", validateMiddleware(loginSchema), login);
router.post("/login", login);

router.get( "/me", authMiddleware, me, (req, res) => {
    return successResponse(
      res,
      "Authentication Successful",
      req.owner
    );
  });
  

router.post("/logout",   authMiddleware, logout);


export default router;


// import { Router } from "express";

// import {
//   register,
//   login,
//   logout,
// } from "./auth.controller.js";

// const router = Router();

// /**
//  * Register Owner
//  */
// router.post("/register", register);

// /**
//  * Login Owner
//  */
// router.post("/login", login);

// /**
//  * Logout Owner
//  */
// router.post("/logout", logout);

// export default router;