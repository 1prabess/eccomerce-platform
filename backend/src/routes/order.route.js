import express from "express";
import { createOrder } from "../controllers/order/createOrder.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";
import { getOrders } from "../controllers/order/getOrders.controller.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authenticate, validateOrder, createOrder);
orderRouter.get("/orders", authenticate, authorizeRoles("admin"), getOrders);

export default orderRouter;
