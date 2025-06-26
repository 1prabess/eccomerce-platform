import Transaction from "../../models/payment.model.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const verifyAndUpdatePaymentStatus = async (req, res) => {
  const { order_id, pidx, status } = req.body;

  try {
    const transaction = await Transaction.findOne({ order_id });
    if (!transaction) {
      return res.status(400).json({ message: "Transaction not found" });
    }

    const { payment_gateway } = transaction;

    if (status === "FAILED") {
      await Transaction.updateOne(
        { order_id },
        { $set: { status: "FAILED", updatedAt: new Date() } }
      );

      return res.status(200).json({
        message: "Transaction marked as FAILED",
        data: { paymentStatus: "FAILED" },
      });
    }

    let paymentStatusCheck;

    if (payment_gateway === "esewa") {
      const paymentData = {
        product_code: process.env.ESEWA_MERCHANT_ID,
        total_amount: transaction.amount,
        transaction_uuid: transaction.order_id,
      };

      const response = await axios.get(
        process.env.ESEWA_PAYMENT_STATUS_CHECK_URL,
        { params: paymentData }
      );

      paymentStatusCheck = response.data;

      const finalStatus =
        paymentStatusCheck.status === "COMPLETE" ? "COMPLETED" : "FAILED";

      await Transaction.updateOne(
        { order_id },
        { $set: { status: finalStatus, updatedAt: new Date() } }
      );

      return res.status(200).json({
        message: `Transaction status updated to ${finalStatus}`,
        data: { paymentStatus: finalStatus },
      });
    }

    if (payment_gateway === "khalti") {
      try {
        const response = await axios.post(
          process.env.KHALTI_VERIFICATION_URL,
          { pidx },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        paymentStatusCheck = response.data;
      } catch (error) {
        if (error.response?.status === 400) {
          paymentStatusCheck = error.response.data;
        } else {
          console.error(
            "Error verifying Khalti payment:",
            error.response?.data || error.message
          );
          throw error;
        }
      }

      const finalStatus =
        paymentStatusCheck.status === "Completed" ? "COMPLETED" : "FAILED";

      await Transaction.updateOne(
        { order_id },
        { $set: { status: finalStatus, updatedAt: new Date() } }
      );

      return res.status(200).json({
        message: `Transaction status updated to ${finalStatus}`,
        data: { paymentStatus: finalStatus },
      });
    }

    return res.status(400).json({ message: "Invalid payment gateway" });
  } catch (error) {
    console.error("Error during payment status check:", error);
    return res.status(500).json({
      message: "Payment status check failed",
      error: error.response?.data || error.message,
    });
  }
};
