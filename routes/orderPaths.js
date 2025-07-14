import { createOrder,getAllOrders,getUserOrders, } from "../controllers/orderController.js";
import express from "express";
import { Auth } from "../utils/jwtFunction.js";
const orderRouter = express();

orderRouter.post("/createOrder", Auth, createOrder);

// Get current user's orders
orderRouter.get("/getUserOrders", Auth, getUserOrders);

// Admin: Get all orders (optional - requires isAdmin check)
orderRouter.get("/getAllOrders", Auth, getAllOrders);

export default orderRouter;
