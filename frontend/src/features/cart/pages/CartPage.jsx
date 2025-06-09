import { useCart } from "@/hooks/cart/useCart";
import CartItem from "../components/CartItem";
import CartTotals from "../components/CartTotals";

function CartPage() {
  const { data } = useCart();

  const cartItems =
    data?.cartItems?.map((cart) => ({
      id: cart._id,
      name: cart.productId.name,
      price: cart.priceAtAddTime,
      quantity: cart.quantity,
      image: cart.productId.images?.[0],
      size: cart.size,
    })) || [];

  return (
    <div className="box">
      <h2 className="my-6 text-2xl">Your Cart</h2>

      <div className="space-y-3">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>

      {cartItems.length > 0 && <CartTotals items={cartItems} />}
    </div>
  );
}

export default CartPage;
