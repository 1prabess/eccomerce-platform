import express from "express";
import { createReview } from "../controllers/review/createReview.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getReviews } from "../controllers/review/getReviews.controller.js";

const reviewRouter = express.Router();

reviewRouter.get("/products/:productId/reviews", getReviews);

reviewRouter.post("/products/:productId/reviews", authenticate, createReview);

export default reviewRouter;
