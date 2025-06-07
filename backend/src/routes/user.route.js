import express from "express";
import { getProfile } from "../controllers/user/getProfile.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import multer from "multer";
import { updateProfileController } from "../controllers/user/updateProfile.controller.js";

// Store files temporarily in a "temp/" directory
const upload = multer({ dest: "temp/" });

const userRouter = express.Router();

userRouter.get("/user/profile", authenticate, getProfile);

userRouter.patch(
  "/user/profile",
  authenticate,
  upload.single("image"),
  updateProfileController
);

export default userRouter;
