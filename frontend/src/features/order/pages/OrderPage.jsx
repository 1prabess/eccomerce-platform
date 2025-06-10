import React, { useState } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import PlaceOrderButton from "../components/PlaceOrder";
import PaymentOptions from "../components/PaymentOptions";
import CartSummary from "../components/CartSummary";
import AddressForm from "../components/AddressForm";

const OrderPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const createOrder = useCreateOrder();
  const { data } = useCart();

  const cartProducts =
    data?.cartItems?.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtAddTime,
      size: item.size,
    })) || [];

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.priceAtPurchase * item.quantity,
    0,
  );
  const shippingFee = 10;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!cartProducts.length) return alert("Cart is empty");

    const orderData = {
      products: cartProducts,
      shippingAddress,
      paymentMethod,
      notes: "Leave at the door",
      shippingFee: 10,
    };

    createOrder.mutate(orderData);
  };

  return (
    <div className="box mt-10 min-h-screen bg-white sm:mt-20">
      <div className="mx-auto grid grid-cols-1 gap-14 md:grid-cols-2">
        <AddressForm
          shippingAddress={shippingAddress}
          handleInputChange={handleInputChange}
        />
        <div>
          <CartSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
          />
          <PaymentOptions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <PlaceOrderButton
            onClick={handlePlaceOrder}
            isLoading={createOrder.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
