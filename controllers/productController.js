import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

// 📌 Create a new product
export const addOrUpdateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stockType,
      quantity,
      shippingInfo
    } = req.body;

    // ✅ 1. Ensure user is authenticated (from Auth middleware)
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
    }

    // ✅ 2. Validate category
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: 'Invalid category selected.' });
    }

    // ✅ 3. Check if product already exists (same name, category, stockType)
    const existingProduct = await Product.findOne({
      name,
      category,
      stockType
    });

    if (existingProduct) {
      // 🔁 Update quantity
      existingProduct.quantity += Number(quantity); // Ensure it's a number
      await existingProduct.save();

      return res.status(200).json({
        message: `Product already exists. Quantity increased by ${quantity}.`,
        product: existingProduct
      });
    }

    // 🆕 Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stockType,
      quantity: Number(quantity),
      shippingInfo: stockType === 'virtual_stock' ? shippingInfo : undefined
    });

    await newProduct.save();

    return res.status(201).json({
      message: 'New product created',
      product: newProduct
    });

  } catch (error) {
    console.error('AddOrUpdateProduct Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

// 📌 Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockType, quantity, shippingInfo } = req.body;

    const updateData = { name, description, price, category, stockType };

    if (stockType === 'in_store') {
      updateData.quantity = quantity;
      updateData.shippingInfo = undefined;
    } else if (stockType === 'virtual_stock') {
      updateData.shippingInfo = shippingInfo;
      updateData.quantity = undefined;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate('category');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 📌 Get products by stock type
export const getProductsByStockType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!['in_store', 'virtual_stock'].includes(type)) {
      return res.status(400).json({ message: 'Invalid stock type' });
    }

    const products = await Product.find({ stockType: type }).populate('category');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
