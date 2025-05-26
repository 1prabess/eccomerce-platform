import express from "express";
import {
  adminSignup,
  logout,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import authenticate from "../middlewares/authenticate.middleware.js";

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

export default authRouter;
