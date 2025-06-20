import express from "express";
import {
  initiatePayment,
  paymentStatus,
} from "../controllers/payment/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/initiate-payment", initiatePayment);

paymentRouter.post("/payment-status", paymentStatus);

export default paymentRouter;
