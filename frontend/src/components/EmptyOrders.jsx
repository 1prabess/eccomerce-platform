import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <FiPackage className="mb-4 text-6xl text-gray-400" />

      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        You have no orders yet
      </h2>
      <p className="mb-8 max-w-md text-sm sm:text-base">
        Looks like you haven’t placed any orders. Start shopping and your orders
        will show up here.
      </p>

      <Link
        to="/products"
        className="bg-black px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800"
      >
        Shop Now
      </Link>
    </div>
  );
}

export default EmptyOrders;
