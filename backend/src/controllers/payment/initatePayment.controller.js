import Transaction from "../../models/payment.model.js";
import { generateHmacSha256Hash } from "../../utils/helper.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const initiatePayment = async (req, res) => {
  const {
    amount,
    orderId,
    paymentGateway,
    customerName,
    customerEmail,
    customerPhone,
  } = req.body;

  if (!paymentGateway) {
    return res.status(400).json({ message: "Payment gateway is required" });
  }

  try {
    const customerDetails = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    };

    const transactionData = {
      customerDetails,
      order_id: orderId,
      amount,
      payment_gateway: paymentGateway,
    };

    let paymentConfig;

    if (paymentGateway === "esewa") {
      const paymentData = {
        amount,
        failure_url: process.env.FAILURE_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: process.env.ESEWA_MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: orderId,
      };

      const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
      const signature = generateHmacSha256Hash(data, process.env.ESEWA_SECRET);

      paymentConfig = {
        url: process.env.ESEWA_PAYMENT_URL,
        data: { ...paymentData, signature },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseHandler: (response) => response.request?.res?.responseUrl,
      };
    } else if (paymentGateway === "khalti") {
      paymentConfig = {
        url: process.env.KHALTI_PAYMENT_URL,
        data: {
          amount: amount * 100,
          mobile: customerDetails.phone,
          product_identity: orderId,
          purchase_order_name: customerDetails.name || "Khalti Payment",
          return_url: process.env.SUCCESS_URL,
          failure_url: process.env.FAILURE_URL,
          public_key: process.env.KHALTI_PUBLIC_KEY,
          website_url: "http://localhost:5173",
          purchase_order_id: orderId,
        },
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        responseHandler: (response) => response.data?.payment_url,
      };
    } else {
      return res.status(400).json({ message: "Invalid payment gateway" });
    }

    const payment = await axios.post(paymentConfig.url, paymentConfig.data, {
      headers: paymentConfig.headers,
    });

    const paymentUrl = paymentConfig.responseHandler(payment);
    if (!paymentUrl) {
      throw new Error("Payment URL is missing in the response");
    }

    const transaction = new Transaction(transactionData);
    await transaction.save();

    return res.status(200).json({
      message: "Payment initiated successfully",
      data: { url: paymentUrl },
    });
  } catch (error) {
    console.error(
      "Error during payment initiation:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      message: "Payment initiation failed",
      error: error.response?.data || error.message,
    });
  }
};
