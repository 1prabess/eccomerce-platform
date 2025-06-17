import React from "react";

function MiniCartItems({ items = [] }) {
  return (
    <div className="mb-6 space-y-1 border p-4">
      <h3 className="text-lg font-semibold text-gray-800">Items in Cart</h3>

      {items
        .filter((item) => item.productId)
        .map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b pb-3 last:border-b-0"
          >
            <img
              src={item.productId.images?.[0] || "/fallback.png"}
              alt={item.productId.name || "Product image"}
              className="h-fit w-16 object-cover"
            />

            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-800">
                {item.productId.name}
              </h4>
              <p className="text-sm text-gray-500">
                Size: {item.size} | Qty: {item.quantity}
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-700">
              ${item.priceAtAddTime * item.quantity}
            </p>
          </div>
        ))}
    </div>
  );
}

export default MiniCartItems;
