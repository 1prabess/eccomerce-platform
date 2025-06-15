import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <FiShoppingCart className="mb-4 text-6xl text-gray-400" />

      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        Your cart is empty
      </h2>
      <p className="mb-8 max-w-md text-sm sm:text-base">
        Looks like you haven’t added anything to your cart yet. Start exploring
        our products!
      </p>

      <Link
        to="/products"
        className="bg-black px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
