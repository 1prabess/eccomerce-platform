import express from "express";
import { createOrder } from "../controllers/order/createOrder.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authenticate, validateOrder, createOrder);

export default orderRouter;
