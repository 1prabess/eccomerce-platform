const CartSummary = ({ subtotal, shippingFee, total }) => (
  <>
    <h2 className="mb-6 text-2xl font-semibold md:my-6">
      <span className="text-gray-500">Cart </span>
      <span className="font-bold">Totals</span>
      <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
    </h2>

    <div className="mb-6 space-y-2 pb-4 text-sm">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping Fee</span>
        <span>${shippingFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </>
);

export default CartSummary;
