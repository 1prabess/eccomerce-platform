import { Trash2 } from "lucide-react";

function CartItem({ item }) {
  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-fit w-20 object-cover lg:w-28"
        />
        <div>
          <h3 className="text-xl lg:text-2xl">{item.name}</h3>
          <p className="text-lg text-gray-600">${item.price}</p>
          <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span>{item.quantity}</span>
        <button>
          <Trash2 className="text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
