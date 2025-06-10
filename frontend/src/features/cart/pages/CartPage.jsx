import { useCart } from "@/hooks/cart/useCart";
import CartItem from "../components/CartItem";
import CartTotals from "../components/CartTotals";
import { useIncreaseQuantity } from "@/hooks/cart/useIncreaseItemQuantity";
import { useDecreaseItemQuantity } from "@/hooks/cart/useDecreaseItemQuantity";
import { useDeleteCartItem } from "@/hooks/cart/useDeleteCartItem";

function CartPage() {
  const { data } = useCart();
  const { mutate: increaseItemQuantity } = useIncreaseQuantity();
  const { mutate: decreaseItemQuantity } = useDecreaseItemQuantity();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;

    increaseItemQuantity({
      productId: item.productId,
      newQuantity,
      size: item.size,
    });
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = item.quantity - 1;

    decreaseItemQuantity({
      productId: item.productId,
      newQuantity,
      size: item.size,
    });
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
      <div className="">
        <div>
          <h2 className="mt-6 text-2xl font-semibold tracking-wide">
            Your Cart
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
                key={item.id}
                item={item}
              />
            ))
          )}
        </div>
        <div> {cartItems.length > 0 && <CartTotals items={cartItems} />}</div>
      </div>
    </div>
  );
}

export default CartPage;
