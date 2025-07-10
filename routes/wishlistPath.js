import {
  toggleWishlistProduct,
  getUserWishlistProducts,
  deleteWishlistProduct
} from "../controllers/wishlistController.js";
import express from "express";
import { Auth } from "../utils/jwtFunction.js";
const wishlistRouter = express();

wishlistRouter.post("/toggleWishlistProduct", Auth, toggleWishlistProduct);
wishlistRouter.get("/getUserWishlistProducts/:userId", Auth, getUserWishlistProducts);
wishlistRouter.delete("/deleteWishlistProduct/:productId", Auth,deleteWishlistProduct); // ✅ Add this

export default wishlistRouter;
