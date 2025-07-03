// Example: GET /api/banners/:bannerId/products
import Banner from '../models/bannerModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import cloudinary from '../utils/cloudinaryConfig.js';
import mongoose from 'mongoose';
export const createBanner = async (req, res) => {
  try {
    const { title,categoryId } = req.body;

    // Validate required fields
    
    const files = req.files?.images || []; // or `images` if you renamed it

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
    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Create banner
    const banner = new Banner({
      title,
      images:uploadedImages,
      category: categoryId
    });

    const savedBanner = await banner.save();

    res.status(201).json({
      message: 'Banner created successfully.',
      banner: savedBanner
    });
    

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductsByBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    // Find the banner with its linked category populated
    const banner = await Banner.findById(bannerId).populate('category');
    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    // Find all products in the same category
    const products = await Product.find({
      category: banner.category._id
    });

    res.status(200).json({
      banner: {
        _id: banner._id,
        title: banner.title,
        images: banner.images,
        category: {
          _id: banner.category._id,
          name: banner.category.name,
          description: banner.category.description
        }
      },
      products
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
