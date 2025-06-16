import { useCart } from "@/hooks/cart/useCart";
import { useIncreaseQuantity } from "@/hooks/cart/useIncreaseItemQuantity";
import { useDecreaseItemQuantity } from "@/hooks/cart/useDecreaseItemQuantity";
import { useDeleteCartItem } from "@/hooks/cart/useDeleteCartItem";

import CartItem from "../components/CartItem";
import CartTotals from "../components/CartTotals";
import EmptyCart from "@/components/EmptyCart";

function CartPage() {
  const { data } = useCart();
  const { mutate: increaseItemQuantity } = useIncreaseQuantity();
  const { mutate: decreaseItemQuantity } = useDecreaseItemQuantity();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const handleIncreaseQuantity = (item) => {
    increaseItemQuantity({
      productId: item.productId,
      newQuantity: item.quantity + 1,
      size: item.size,
    });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      decreaseItemQuantity({
        productId: item.productId,
        newQuantity: item.quantity - 1,
        size: item.size,
      });
    }
  };

  const handleRemoveItem = (item) => {
    deleteCartItem(item.id);
  };

  const cartItems =
    data?.cartItems?.map((cart) => ({
      id: cart._id,
      name: cart.productId.name,
      price: cart.priceAtAddTime,
      quantity: cart.quantity,
      image: cart.productId.images?.[0],
      size: cart.size,
      productId: cart.productId._id,
    })) || [];

  return (
    <div className="box">
      <div>
        <h2 className="my-6 text-2xl font-semibold">
          <span className="text-gray-500">My </span>
          <span className="font-bold">Cart</span>
          <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
        </h2>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="border-b">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6">
          <CartTotals items={cartItems} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
