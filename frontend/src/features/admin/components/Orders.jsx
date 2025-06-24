import React, { useState, useEffect } from "react";
import { useAllOrders } from "@/hooks/order/useAllOrders";
import { useUpdateOrderStatus } from "@/hooks/order/useUpdateOrderStatus";
import { useUpdateOrderPaymentStatus } from "@/hooks/order/useUpdateOrderPaymentStatus";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const paymentStatusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
  default: "bg-gray-100 text-gray-800",
};

function Orders() {
  const [orderStatus, setOrderStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;

  const filters = {
    page,
    limit,
    orderStatus: orderStatus === "all" ? undefined : orderStatus,
    paymentStatus:
      paymentStatus === "all" ? undefined : paymentStatus.toUpperCase(),
  };

  const { data: orders = [], isLoading, isError } = useAllOrders(filters);
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const { mutate: updateOrderPaymentStatus } = useUpdateOrderPaymentStatus();

  useEffect(() => {
    setPage(1);
  }, [orderStatus, paymentStatus]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({
      orderID: orderId,
      updateData: { orderStatus: newStatus },
    });
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    updateOrderPaymentStatus({
      orderID: orderId,
      updateData: { paymentStatus: newStatus.toUpperCase() },
    });
  };

  if (isLoading) return <p className="p-6 text-center">Loading orders...</p>;
  if (isError)
    return (
      <p className="p-6 text-center text-red-600">Error loading orders.</p>
    );

  return (
    <div>
      <div className="mb-6 flex gap-4 sm:flex-row sm:items-end">
        <div className="w-64">
          <label className="mb-1 block font-semibold">Order Status</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full border border-gray-300 bg-white p-2 focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="w-64">
          <label className="mb-1 block font-semibold">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full border border-gray-300 bg-white p-2 focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length === 0 && (
          <p className="text-gray-500">No orders found for these filters.</p>
        )}

        {orders.map((order) => (
          <div key={order._id} className="border border-gray-200 bg-white p-5">
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
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={`rounded border px-3 py-1 text-sm capitalize ${
                    statusColor[order.orderStatus] || statusColor.default
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="mb-1 font-semibold">Shipping Address</h3>
              <p className="text-sm break-words text-gray-700">
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="mb-2 font-semibold">Products</h3>
              <div className="space-y-3">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col gap-4 border border-gray-100 bg-gray-50 p-3 sm:flex-row sm:items-center"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-fit w-16 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm">
                        Quantity: {product.quantity} | Price: Rs.
                        {product.priceAtPurchase}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: Rs.
                        {(product.quantity * product.priceAtPurchase).toFixed(
                          2,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Payment:</span>
                  {order.paymentMethod === "esewa" && (
                    <div className="flex items-center gap-1">
                      <img
                        src="/esewa-logo.png"
                        alt="eSewa"
                        className="h-4 w-auto"
                      />
                      <span>Esewa</span>
                    </div>
                  )}
                  {order.paymentMethod === "khalti" && (
                    <div className="flex items-center gap-1">
                      <img
                        src="/khalti-logo.png"
                        alt="Khalti"
                        className="h-4 w-auto"
                      />
                      <span>Khalti</span>
                    </div>
                  )}
                  {order.paymentMethod === "cash" && <span>Cash</span>}
                </div>

                <p className="mt-2 flex items-center gap-1">
                  <span className="font-semibold">Payment Status: </span>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(order._id, e.target.value)
                    }
                    className={`rounded border px-3 py-1 text-sm capitalize ${
                      paymentStatusColor[order.paymentStatus.toLowerCase()] ||
                      paymentStatusColor.default
                    }`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="FAILED">Failed</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </p>
              </div>

              <div className="mt-2 text-base font-semibold sm:mt-0">
                Total: Rs. {(order.totalPrice + order.shippingFee).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

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
}

export default Orders;
