import { useNavigate } from "react-router-dom";

function CartTotals({ items }) {
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-full items-center md:mt-4">
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/order")}
          className="w-fit bg-black px-4 py-3 text-white hover:bg-gray-800"
        >
          Checkout: ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default CartTotals;
