import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Create a new product


export const addOrUpdateProduct = async (req, res) => {
  try {
    // ✅ 1) Get uploaded files (must match your Multer field name)
    const files = req.files?.image || []; // or `images` if you renamed it

    if (files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // ✅ 2) Upload all images to Cloudinary and collect URLs
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products_gallery",
      });
      uploadedImages.push(result.secure_url);
    }

    // ✅ 3) Extract other product fields
    const {
      name,
      description,
      price,
      category,
      stockType,
      quantity,
      shippingProvider,
      estimatedDeliveryDays,
    } = req.body;

    // ✅ 4) Validate category
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category selected." });
    }

    // ✅ 5) (Optional) Check for duplicate product
    const existingProduct = await Product.findOne({ name, category, stockType });
    if (existingProduct) {
      existingProduct.quantity += Number(quantity) || 0;
      await existingProduct.save();
      return res.status(200).json({
        message: "Product exists, quantity updated",
        product: existingProduct,
      });
    }

    // ✅ 6) Create new product
    const newProduct = new Product({
      image: uploadedImages, // ✅ Array of URLs!
      name,
      description,
      price,
      category,
      stockType,
      quantity: Number(quantity) || 0,
      shippingInfo: {
        provider: shippingProvider || null,
        estimatedDeliveryDays: estimatedDeliveryDays || null,
      },
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully with multiple images",
      product: newProduct,
    });

  } catch (error) {
    console.error("AddOrUpdateProduct Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
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


// export const createProduct = async (req, res) => {

//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       stockType,
//       quantity,
//       shippingInfo
//     } = req.body;

//     // ✅ 1. Auth check
//     const user = req.user;
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // ✅ 2. Validate category
//     const existingCategory = await Category.findById(category);
//     if (!existingCategory) {
//       return res.status(400).json({ message: "Invalid category" });
//     }

//     // ✅ 3. Check if product exists
//     let product = await Product.findOne({ name, category, stockType });

//     if (product) {
//       // Update quantity
//       product.quantity += Number(quantity);
//     } else {
//       // Create new product
//       product = new Product({
//         name,
//         description,
//         price,
//         category,
//         stockType,
//         quantity: Number(quantity),
//         shippingInfo:
//           stockType === "virtual_stock" ? shippingInfo : undefined,
//         gallery: [],
//       });
//     }

//     // ✅ 4. Upload images if any
//     if (req.files && req.files.images) {
//       const images = req.files.images;
//       for (const file of images) {
//         const result = await cloudinary.uploader.upload(file.path, {
//           folder: "product_gallery",
//         });

//         const galleryItem = new Gallery({
//           product: product._id, // For new product this will be null at first
//           imageUrl: result.secure_url,
//         });

//         await galleryItem.save();
//         product.gallery.push(galleryItem._id);
//       }
//     }

//     await product.save();

//     // ✅ 5. If new product, update gallery's product ID now that product._id exists
//     if (!product._id) {
//       await Gallery.updateMany({ product: null }, { product: product._id });
//     }

//     res.status(201).json({
//       message: product.isNew
//         ? "New product created"
//         : "Product updated",
//       product,
//     });
//   } catch (error) {
//     console.error("AddOrUpdateProduct Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// 📌 Get products sorted by createdAt
export const getProductsByCreationDate = async (req, res) => {
  try {
    // Get optional `order` query param: 'asc' or 'desc'
    const { order = 'desc' } = req.query;

    // Validate order value
    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({ message: "Invalid order value. Use 'asc' or 'desc'." });
    }

    // Find all products sorted by createdAt
    const products = await Product.find()
      .sort({ createdAt: order === 'asc' ? 1 : -1 })
      .populate('category');

    res.status(200).json({
      message: `Products sorted by createdAt (${order})`,
      products,
    });
  } catch (error) {
    console.error("getProductsByCreationDate Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
