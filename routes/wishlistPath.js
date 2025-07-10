import {
  toggleWishlistProduct,
  getUserWishlistProducts,
} from "../controllers/wishlistController.js";
import express from "express";
import { Auth } from "../utils/jwtFunction.js";
const wishlistRouter = express();

wishlistRouter.post("/toggleWishlistProduct", Auth, toggleWishlistProduct);
wishlistRouter.get("/getUserWishlistProducts/:userId", Auth, getUserWishlistProducts);

export default wishlistRouter;
