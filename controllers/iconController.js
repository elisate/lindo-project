// controllers/iconController.js
import Icon from "../models/iconModel.js";
import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (reuse your config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createIcon = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const files = req.files?.image || [];

    // Validate title
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Validate category ID
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    // Check that category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Validate files
    if (files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "icons",
      });
      uploadedImages.push(result.secure_url);
    }

    // Create new Icon
    const newIcon = new Icon({
      title,
      image: uploadedImages,
      categoryId: category._id, // ✅ store properly under `categoryId`
    });

    const savedIcon = await newIcon.save();

    // Optionally populate category in response
    const populatedIcon = await savedIcon.populate("categoryId");

    res.status(201).json({
      message: "Icon created successfully",
      icon: populatedIcon,
    });
  } catch (error) {
    console.error("createIcon error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get all Icons
export const getIcons = async (req, res) => {
  try {
    const icons = await Icon.find().populate("categoryId");
    res.status(200).json(icons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single Icon
export const getIconById = async (req, res) => {
  try {
    const icon = await Icon.findById(req.params.id).populate("categoryId");
    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }
    res.status(200).json(icon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Icon (with new image upload if provided)
export const updateIcon = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const files = req.files?.image || [];

    const icon = await Icon.findById(req.params.id);
    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      icon.categoryId = categoryId;
    }

    icon.title = title || icon.title;

    if (files.length > 0) {
      const uploadedImages = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "icons",
        });
        uploadedImages.push(result.secure_url);
      }
      icon.image = uploadedImages; // Replace old images
    }

    const updatedIcon = await icon.save();
    res.status(200).json(updatedIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Icon
export const deleteIcon = async (req, res) => {
  try {
    const deletedIcon = await Icon.findByIdAndDelete(req.params.id);
    if (!deletedIcon) {
      return res.status(404).json({ message: "Icon not found" });
    }
    res.status(200).json({ message: "Icon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get the Category related to a single Icon
export const getCategoryByIconId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the icon
    const icon = await Icon.findById(id);
    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }

    // Make sure icon has a category
    if (!icon.categoryId) {
      return res.status(404).json({ message: "This Icon has no category" });
    }

    // Find the category
    const category = await Category.findById(icon.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
