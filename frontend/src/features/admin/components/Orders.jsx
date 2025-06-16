import React, { useState, useEffect } from "react";
import { useAllOrders } from "@/hooks/order/useAllOrders";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const paymentColor = {
  paid: "text-green-600 font-medium",
  pending: "text-yellow-600 font-medium",
  failed: "text-red-600 font-medium",
  default: "text-gray-700 font-medium",
};

const Orders = () => {
  const [orderStatus, setOrderStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;

  const filters = {
    page,
    limit,
    orderStatus: orderStatus === "all" ? undefined : orderStatus,
    paymentStatus: paymentStatus === "all" ? undefined : paymentStatus,
  };

  const { data: orders = [], isLoading, isError } = useAllOrders(filters);

  useEffect(() => {
    setPage(1);
  }, [orderStatus, paymentStatus]);

  if (isLoading) return <p className="p-6 text-center">Loading orders...</p>;
  if (isError)
    return (
      <p className="p-6 text-center text-red-600">Error loading orders.</p>
    );

  return (
    <div className="">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <div>
          <label className="mb-1 block font-semibold">Order Status</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 && (
          <p className="text-gray-500">No orders found for these filters.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="-md -sm border border-gray-200 bg-white p-5"
          >
            <div className="mb-3 flex flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold break-words">
                  Order #{order._id}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="mt-2 sm:mt-0">
                <span
                  className={`-full inline-block px-3 py-1 text-sm capitalize ${
                    statusColor[order.orderStatus] || statusColor.default
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h3 className="mb-1 font-semibold">Shipping Address</h3>
              <p className="text-sm break-words text-gray-700">
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h3 className="mb-2 font-semibold">Products</h3>
              <div className="space-y-3">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="-md flex flex-col gap-4 border border-gray-100 bg-gray-50 p-3 sm:flex-row sm:items-center"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-fit w-16 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm">
                        Quantity: {product.quantity} | Price: $
                        {product.priceAtPurchase}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: $
                        {(product.quantity * product.priceAtPurchase).toFixed(
                          2,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info and Total */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Payment Method: </span>
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Payment Status: </span>
                  <span
                    className={
                      paymentColor[order.paymentStatus] || paymentColor.default
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <div className="mt-2 text-base font-semibold sm:mt-0">
                Total: ${(order.totalPrice + order.shippingFee).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={orders.length < limit}
          className="border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
