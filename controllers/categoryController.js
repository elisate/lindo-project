import Category from "../models/categoryModel.js";

// Create a new category
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
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

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists.' });
    }

    const category = new Category({ name, description,image:uploadedImages });
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a category by ID
// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Prepare the update payload
    const updateData = { name, description };

    // ✅ Handle image upload if new images are provided
    const files = req.files?.image || [];
    if (files.length > 0) {
      const uploadedImages = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "categories_gallery",
        });
        uploadedImages.push(result.secure_url);
      }
      updateData.image = uploadedImages; // overwrite old images with new ones
    }

    // ✅ Update the category
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated', category });
  } catch (error) {
    console.error('updateCategory Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
