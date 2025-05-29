import express from "express";
import { createOrder } from "../controllers/order/createOrder.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";
import { getOrders } from "../controllers/order/getOrders.controller.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import { getMyOrders } from "../controllers/order/getMyOrders.controller.js";
import { getOrder } from "../controllers/order/getOrder.controller.js";
import { updateOrderStatus } from "../controllers/order/updateOrderStatus.controller.js";

const orderRouter = express.Router();

orderRouter.post("/orders", authenticate, validateOrder, createOrder);

orderRouter.get("/orders", authenticate, authorizeRoles("admin"), getOrders);

orderRouter.get("/orders/my", authenticate, getMyOrders);

orderRouter.get("/orders/:id", authenticate, getOrder);

orderRouter.patch(
  "/orders/:id/status",
  authenticate,
  authorizeRoles("admin"),
  updateOrderStatus
);

export default orderRouter;
