// Example: GET /api/banners/:bannerId/products
import Banner from '../models/bannerModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import cloudinary from '../utils/cloudinaryConfig.js';
import mongoose from 'mongoose';
export const createBanner = async (req, res) => {
  try {
    const { title, subTitle, categoryId } = req.body; // 👈 Add subTitle

    const files = req.files?.images || [];
    if (files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products_gallery",
      });
      uploadedImages.push(result.secure_url);
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const banner = new Banner({
      title,
      subTitle, // 👈 Save it
      images: uploadedImages,
      category: categoryId,
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




/** ✅ READ ALL Banners **/
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find()
      .populate('category')
      .sort({ createdAt: -1 }); // ✅ Sort by newest first

    res.status(200).json({ banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/** ✅ READ ONE Banner **/
export const getBannerById = async (req, res) => {
  try {
    const { bannerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const banner = await Banner.findById(bannerId).populate('category');
    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    res.status(200).json({ banner });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/** ✅ UPDATE Banner **/
export const updateBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    const { title, subTitle, categoryId } = req.body; // 👈 Add subTitle

    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    if (title) banner.title = title;
    if (subTitle) banner.subTitle = subTitle; // 👈 Update subTitle

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }
      banner.category = categoryId;
    }

    if (req.files?.images && req.files.images.length > 0) {
      const uploadedImages = [];
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products_gallery",
        });
        uploadedImages.push(result.secure_url);
      }
      banner.images = uploadedImages;
    }

    const updatedBanner = await banner.save();

    res.status(200).json({
      message: "Banner updated successfully.",
      banner: updatedBanner,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/** ✅ DELETE Banner **/
export const deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const banner = await Banner.findByIdAndDelete(bannerId);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    res.status(200).json({ message: "Banner deleted successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCategoryByBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return res.status(400).json({ message: "Invalid banner ID." });
    }

    const banner = await Banner.findById(bannerId).populate('category');
    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    res.status(200).json({ category: banner.category });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
