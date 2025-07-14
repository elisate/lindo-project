// controllers/orderController.js

import Order from "../models/Order.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Retrieve the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Add items before placing an order." });
    }

    // 2. Calculate total amount
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    // 3. Build order data
    const orderData = {
      userId: userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      status: 'pending',
      paymentMethod: req.body.paymentMethod || 'cash',
      shippingAddress: req.body.shippingAddress || 'No address provided'
    };

    // 4. Save the order
    const order = new Order(orderData);
    await order.save();

    // 5. Clear the cart after order is placed
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order created successfully.",
      order
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Internal server error while creating order." });
  }
};
