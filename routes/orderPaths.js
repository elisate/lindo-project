import { createOrder } from "../controllers/orderController.js";
import express from "express";
import { Auth } from "../utils/jwtFunction.js";
const orderRouter = express();

orderRouter.post("/createOrder", Auth, createOrder);

export default orderRouter;
