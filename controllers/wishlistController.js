// controllers/wishlistController.js

import Wishlist from '../models/wishlistModel.js';
import Product from '../models/productModel.js';

export const toggleWishlistProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
      await wishlist.save();
      return res.status(201).json({ message: 'Product added to wishlist.', wishlist });
    }

    const index = wishlist.products.indexOf(productId);

    if (index === -1) {
      wishlist.products.push(productId);
      await wishlist.save();
      return res.status(200).json({ message: 'Product added to wishlist.', wishlist });
    } else {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      return res.status(200).json({ message: 'Product removed from wishlist.', wishlist });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserWishlistProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId if you want
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      return res.status(200).json({
        message: 'No wishlist found for this user.',
        products: [],
      });
    }

    res.status(200).json({
      message: 'User wishlist products retrieved successfully.',
      products: wishlist.products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


