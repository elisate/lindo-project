import { addToCart,getCart,removeFromCart } from "../controllers/cartController.js";
import express from "express"
import { Auth } from "../utils/jwtFunction.js";
const cartRouter=express();

cartRouter.post("/addToCart",Auth,addToCart);
cartRouter.get("/getCartByUserId",Auth,getCart);
cartRouter.delete("/removeFromCart/:productId",Auth,removeFromCart);
cartRouter.get("/getByUserId",Auth,getCart)

export default cartRouter;