import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getCartItems } from "../controllers/cart/getCartItems.controller.js";
import { addItemToCart } from "../controllers/cart/addItemToCart.controller.js";
import { updateCartItemQuantity } from "../controllers/cart/updateCartItemQuantity.controller.js";
import { deleteCartItem } from "../controllers/cart/deleteCartItem.controller.js";
import { resetCart } from "../controllers/cart/resetCart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/cart", authenticate, getCartItems);

cartRouter.post("/cart", authenticate, addItemToCart);

cartRouter.patch("/cart/update", authenticate, updateCartItemQuantity);

cartRouter.delete("/cart/deleteItem", authenticate, deleteCartItem);

cartRouter.delete("/cart", authenticate, resetCart);

export default cartRouter;
