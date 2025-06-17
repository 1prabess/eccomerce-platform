import EmptyOrders from "@/components/EmptyOrders";
import { useOrders } from "@/hooks/order/useOrders";
import { format } from "date-fns";
import ReviewModal from "@/components/ReviewModal";
import { useState } from "react";

const OrdersPage = () => {
  const { data: orders, isLoading, isError } = useOrders();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading)
    return <p className="p-6 text-center text-gray-600">Loading orders…</p>;
  if (isError)
    return (
      <p className="p-6 text-center text-red-600">Error loading orders.</p>
    );

  return (
    <div className="box relative">
      <h2 className="my-6 text-2xl font-semibold">
        <span className="text-gray-500">My </span>
        <span className="font-bold">Orders</span>
        <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
      </h2>

      {!orders || orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 bg-white p-5"
            >
              {/* Top Section */}
              <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {format(new Date(order.createdAt), "EEE, MMM d yyyy")}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium text-green-700 uppercase">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col gap-3 border border-gray-100 bg-gray-50 p-3 sm:flex-row sm:items-center"
                  >
                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/80x100"
                      }
                      alt={product.name || "Product"}
                      className="h-fit w-20 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity} &bull; $
                        {product.priceAtPurchase} each
                      </p>
                      <p className="text-sm text-gray-500">
                        Subtotal: $
                        {(product.quantity * product.priceAtPurchase).toFixed(
                          2,
                        )}
                      </p>
                    </div>

                    {/* Write Review Button */}
                    {order.orderStatus === "delivered" && (
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="mt-2 w-full bg-black px-3 py-1.5 text-sm font-medium text-white sm:mt-0 sm:w-auto"
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Payment and Total */}
              <div className="mt-4 flex flex-col justify-between gap-2 border-t pt-4 text-sm text-gray-700 sm:flex-row sm:items-center">
                <p>
                  <span className="font-medium text-gray-800">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ReviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
