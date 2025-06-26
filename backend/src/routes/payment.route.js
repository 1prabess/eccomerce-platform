import express from "express";
import { initiatePayment } from "../controllers/payment/initatePayment.controller.js";
import { verifyAndUpdatePaymentStatus } from "../controllers/payment/verifyAndUpdatePaymentStatus.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/initiate", initiatePayment);

paymentRouter.post("/payment/status", verifyAndUpdatePaymentStatus);

export default paymentRouter;
