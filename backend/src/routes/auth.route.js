import express from "express";

import authorizeRoles from "../middlewares/authorize.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { signup } from "../controllers/auth/signup.controller.js";
import { adminSignup } from "../controllers/auth/adminSignup.controller.js";
import { signin } from "../controllers/auth/signin.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { verifyAccount } from "../controllers/auth/verifyAccount.controller.js";
import { forgotPassword } from "../controllers/auth/forgotPassword.controller.js";
import { resetPassword } from "../controllers/auth/resetPassword.controller.js";

const authRouter = express.Router();

authRouter.post("/auth/signup", signup);

authRouter.post(
  "/auth/admin/signup",
  authenticate,
  authorizeRoles("admin"),
  adminSignup
);

authRouter.post("/auth/signin", signin);

authRouter.post("/auth/logout", logout);

authRouter.post("/auth/verify-account/:token", verifyAccount);

authRouter.post("/auth/forgot-password", forgotPassword);

authRouter.post("/auth/reset-password/:token", resetPassword);

export default authRouter;
