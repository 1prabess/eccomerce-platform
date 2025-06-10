const CartSummary = ({ subtotal, shippingFee, total }) => (
  <>
    <h2 className="mb-6 text-2xl font-semibold tracking-wide">Cart totals</h2>

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
