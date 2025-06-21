import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "@/lib/utils";
import { useMarkPaymentAsFailed } from "@/hooks/payment/useMarkPaymentAsFailed";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("data");
  const decoded = token ? base64Decode(token) : null;
  const product_id =
    decoded?.transaction_uuid ||
    queryParams.get("purchase_order_id") ||
    sessionStorage.getItem("current_transaction_id");

  const { mutate: markFailed } = useMarkPaymentAsFailed();

  useEffect(() => {
    if (product_id) {
      markFailed(product_id);
    }
  }, [product_id, markFailed]);

  return (
    <div className="mx-auto max-w-md border px-8 py-14 text-center">
      <div className="mb-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      </div>

      <h1 className="mb-4 text-center text-4xl font-semibold">
        Payment Failed!
      </h1>
      <p className="mb-10 text-red-600">
        There was an issue processing your payment but your order has been
        successfully created and you can try paying again later!
      </p>

      <div className="border border-red-200 p-6 text-left text-red-700">
        <p className="mb-3 text-lg">
          <strong>Transaction ID:</strong> {product_id || "Not available"}
        </p>
        <p className="text-lg">
          If the amount was deducted from your account, it will be refunded
          within 3-5 business days.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-red-700 px-10 py-3 text-white shadow-lg transition hover:bg-red-800"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
