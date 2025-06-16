import { Trash2, Plus, Minus } from "lucide-react";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex flex-col gap-4 border-t border-gray-300 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Image and details */}
      <div className="flex items-center gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="h-fit w-24 border border-gray-200 object-cover"
        />
        <div>
          <h3 className="text-lg text-gray-900">{item.name}</h3>
          <p className="text-md mt-1 font-medium text-gray-700">
            ${item.price.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
        </div>
      </div>

      {/* Quantity controls and remove */}
      <div className="flex items-center gap-6 sm:justify-end">
        <div className="flex items-center overflow-hidden border border-gray-300">
          <button
            onClick={() => onDecrease(item)}
            className="flex h-8 w-8 items-center justify-center border-r border-gray-300 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="inline-block w-12 text-center text-sm font-medium text-gray-900">
            {item.quantity}
          </span>
          <button
            onClick={() => onIncrease(item)}
            className="flex h-8 w-8 items-center justify-center border-l border-gray-300 text-gray-600 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item)}
          className="p-2 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
