import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "@/lib/utils";
import { useUpdateOrderPaymentStatus } from "@/hooks/order/useUpdateOrderPaymentStatus";
import { useVerifyPaymentAndUpdateStatus } from "@/hooks/payment/useVerifyPaymentAndUpdateStatus";

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [verificationError, setVerificationError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: verifyPayment, isLoading: isVerifying } =
    useVerifyPaymentAndUpdateStatus();

  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("data");
  const decoded = token ? base64Decode(token) : null;
  const order_id =
    decoded?.transaction_uuid || queryParams.get("purchase_order_id");

  const isKhalti = queryParams.get("pidx") !== null;
  const rawAmount =
    decoded?.total_amount ||
    queryParams.get("total_amount") ||
    queryParams.get("amount");
  const total_amount = isKhalti ? rawAmount / 100 : rawAmount;

  useEffect(() => {
    if (!order_id) return;

    verifyPayment(
      { order_id, pidx: queryParams.get("pidx") },
      {
        onSuccess: (data) => {
          if (data.paymentStatus === "COMPLETED") {
            setPaymentStatus("COMPLETED");
          } else {
            navigate("/payment-failure", {
              search: `?purchase_order_id=${order_id}`,
            });
          }
        },
        onError: () => {
          setVerificationError(true);
        },
      },
    );
  }, [order_id]);

  if (isVerifying)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-green-50 to-white">
        <p className="animate-pulse text-xl font-semibold text-green-700">
          Verifying payment...
        </p>
      </div>
    );

  if (verificationError) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-red-50 px-6 py-12 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-extrabold text-red-700">
          Payment Verification Failed
        </h1>
        <p className="mb-6 text-red-600">
          Your transaction is being processed, but we couldn't verify its
          status.
        </p>
        <p className="mb-8 text-red-600">
          If the amount was deducted, please contact our support team.
        </p>
        <p className="mb-8 text-sm text-red-500">
          Reference ID: {order_id || queryParams.get("pidx") || "Unknown"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-red-700 px-8 py-3 text-white transition hover:bg-red-800"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg border bg-white px-8 py-14">
      <div className="mb-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
      </div>
      <h1 className="mb-4 text-center text-4xl font-semibold">
        Payment Successful!
      </h1>
      <p className="mb-10 text-center text-gray-700">
        Thank you for your payment. Your transaction was successful.
      </p>

      <div className="border border-gray-200 p-6 text-left">
        <p className="mb-2 text-lg">Amount Paid: NPR {total_amount}</p>
        <p className="mb-2 text-lg">Transaction ID: {order_id}</p>
        {paymentStatus === "COMPLETED" && (
          <>
            <p className="mb-2 text-lg">
              Payment Method: {isKhalti ? "Khalti" : "eSewa"}
            </p>
            <p className="text-lg">Payment Status: Completed</p>
          </>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-black px-10 py-3 text-white shadow-lg transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
