function CartTotals({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="mt-8 ml-auto max-w-md">
      <h3 className="mb-4 border-b pb-2 text-xl font-semibold">Cart Totals</h3>

      <div className="mb-2 flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Shipping Fee</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-black">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="mt-6 w-full rounded bg-black py-3 text-white hover:bg-gray-800">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartTotals;
