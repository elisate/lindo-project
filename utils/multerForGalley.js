import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

// ✅ Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "misc"; // fallback

    // Use clear folders
    if (file.fieldname === "images") folder = "product_gallery";
    if (file.fieldname === "videos") folder = "videos";
    if (file.fieldname === "documents") folder = "documents";

    return {
      folder,
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

// ✅ Allowed mimetypes map
const allowedFormats = {
  images: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"],
  videos: ["video/mp4", "video/mpeg"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/ppt",
  ],
};

// ✅ Multer uploader
const configurationMulter = () =>
  multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    fileFilter: (req, file, cb) => {
      let field = file.fieldname;
      if (field === "image") field = "images"; // Normalize

      if (allowedFormats[field]?.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file type for ${field}: ${file.mimetype}`));
      }
    },
  }).fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
    { name: "documents", maxCount: 5 },
  ]);

export default configurationMulter;
