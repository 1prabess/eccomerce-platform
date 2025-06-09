import express from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { getCartItems } from "../controllers/cart/getCartItems.controller.js";
import { addItemToCart } from "../controllers/cart/addItemToCart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/cart", authenticate, getCartItems);

cartRouter.post("/cart/add", authenticate, addItemToCart);

export default cartRouter;
