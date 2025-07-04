
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Make sure your auth middleware sets this

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Product ID and valid quantity are required.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();

    res.status(200).json({ message: 'Item added to cart.', cart });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error.' });
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

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart.', cart });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
