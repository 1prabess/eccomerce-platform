import React from "react";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => (
  <>
    <h3 className="mb-4 text-sm font-medium tracking-wide">
      PAYMENT <span className="font-semibold">METHOD</span>
      <hr className="mt-2 w-40 border-gray-400" />
    </h3>

    <div className="mb-8 flex flex-wrap gap-4">
      {/* Esewa */}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === "esewa"}
          onChange={() => setPaymentMethod("esewa")}
        />
        <img
          src="/esewa-logo.png"
          alt="eSewa logo"
          className="h-fit w-6 object-contain"
        />
        <span className="text-sm font-bold text-green-800">Esewa</span>
      </label>

      {/* Khalti */}
      <label className="flex w-[130px] cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === "khalti"}
          onChange={() => setPaymentMethod("khalti")}
        />
        <img
          src="/khalti-logo.png"
          alt="khalti logo"
          className="h-fit w-7 object-contain"
        />
        <span className="text-sm font-bold text-purple-800">Khalti</span>
      </label>

      {/* Cash on Delivery */}
      <label className="flex w-[180px] cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2">
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === "cash"}
          onChange={() => setPaymentMethod("cash")}
        />
        <span className="flex items-center gap-2 text-sm font-bold">Cash</span>
      </label>
    </div>
  </>
);

export default PaymentOptions;
