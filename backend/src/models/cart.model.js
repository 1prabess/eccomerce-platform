import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },

    size: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },

    priceAtAddTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
