import express from "express";
import { getProfile } from "../controllers/user/getProfile.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const userRouter = express.Router();

userRouter.get("/user/profile", authenticate, getProfile);

export default userRouter;
