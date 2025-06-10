import React from "react";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => (
  <>
    <h3 className="mb-4 text-sm font-medium tracking-wide">
      PAYMENT <span className="font-semibold">METHOD</span>
      <hr className="mt-2 w-40 border-gray-400" />
    </h3>

    <div className="mb-8 flex flex-wrap gap-4">
      {/* Esewa (digital for backend) */}
      <label className="flex w-[130px] cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === "digital"}
          onChange={() => setPaymentMethod("digital")}
        />
        <span className="text-sm font-bold text-green-800">Esewa</span>
      </label>

      {/* Cash on Delivery */}
      <label className="flex w-[180px] cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === "cash"}
          onChange={() => setPaymentMethod("cash")}
        />
        <span className="flex items-center gap-2 text-sm font-bold">
          Cash on Delivery
        </span>
      </label>
    </div>
  </>
);

export default PaymentOptions;
