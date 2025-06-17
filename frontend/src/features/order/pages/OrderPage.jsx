import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { useNavigate } from "react-router-dom";

import PlaceOrderButton from "../components/PlaceOrder";
import PaymentOptions from "../components/PaymentOptions";
import CartSummary from "../components/CartSummary";
import AddressForm from "../components/AddressForm";
import MiniCartItems from "../components/MiniCartItems";

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
  const [errors, setErrors] = useState({});

  const createOrder = useCreateOrder();
  const { data: cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart || cart.cartItems?.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const cartProducts =
    cart?.cartItems
      ?.filter((item) => item.productId && item.productId._id)
      .map((item) => ({
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(shippingAddress)) {
      if (!value.trim()) {
        newErrors[key] = "Required";
      } else if (key === "phone" && !/^\d{7,15}$/.test(value)) {
        newErrors[key] = "Phone must be 7-15 digits";
      }
    }
    return newErrors;
  };

  const handlePlaceOrder = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderData = {
      products: cartProducts,
      shippingAddress,
      paymentMethod,
      notes: "Leave at the door",
      shippingFee,
    };

    createOrder.mutate(orderData);
  };

  return (
    <div className="box min-h-screen bg-white">
      <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-14">
        <div>
          <AddressForm
            shippingAddress={shippingAddress}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          <div className="mt-8">
            <MiniCartItems items={cart?.cartItems || []} />
          </div>
        </div>
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
