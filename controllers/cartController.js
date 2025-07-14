
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"
import mongoose from "mongoose";
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // 1. Validate inputs
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid or missing product ID." });
    }

    if (!quantity || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be a number greater than 0." });
    }

    // 2. Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 3. Find or create the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // 4. Check if product is already in cart
    const existingItem = cart.items.find(item =>
      item.productId.toString() === productId
    );

    if (existingItem) {
      // Product exists → increase quantity and update price
      existingItem.quantity += quantity;
      existingItem.price = product.price; // Optional: always update price
    } else {
      // Product does not exist → add it
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }

    // 5. Save the cart
    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully.",
      cart
    });

  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ message: "Internal server error while adding to cart." });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty or not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    // Decrement quantity or remove item
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // Remove item if quantity is 1
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.status(200).json({
      message: 'Product quantity updated in cart.',
      cart
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Internal server error while updating cart.' });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'name price image category stockType' // Adjust as needed
    });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: 'Cart is empty.', cart: { items: [] } });
    }

    res.status(200).json({ message: 'Cart retrieved successfully.', cart });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Internal server error while fetching cart.' });
  }
};
