// controllers/adController.js
import Ad from "../models/addModel.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Ad
export const createAd = async (req, res) => {
  try {
    const { title, content, image, buttonLabel } = req.body;
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


    const newAd = new Ad({
      title,
      content,
      image,
      buttonLabel,
      image:uploadedImages
    });

    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Ads
export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Ad by ID
export const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ad
export const updateAd = async (req, res) => {
  try {
    const { title, content, buttonLabel } = req.body;
    const files = req.files?.image || []; // or `images`

    // Find the Ad first
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // If new files are uploaded, upload them to Cloudinary
    let updatedImages = ad.image; // keep existing images by default
    if (files.length > 0) {
      const uploadedImages = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products_gallery",
        });
        uploadedImages.push(result.secure_url);
      }
      updatedImages = uploadedImages; // replace with new ones — or merge if you prefer
    }

    // Update fields
    ad.title = title || ad.title;
    ad.content = content || ad.content;
    ad.buttonLabel = buttonLabel || ad.buttonLabel;
    ad.image = updatedImages;

    const updatedAd = await ad.save();

    res.status(200).json(updatedAd);
  } catch (error) {
    console.error(error); // log to server console!
    res.status(500).json({ message: error.message });
  }
};

// Delete Ad
export const deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
