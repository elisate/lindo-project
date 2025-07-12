// routes/adRoutes.js
import express from "express";
import {
  createAd,
  getAds,
  getAdById,
  updateAd,
  deleteAd,
} from "../controllers/addController.js";
import configureMulter from "../utils/multer.js";

const upload=configureMulter();

const addRouter = express();
addRouter.post("/createAd",upload,createAd);       // Create
addRouter.get("/getAds", getAds);          // Read All
addRouter.get("/getAdById/:id", getAdById);    // Read One
addRouter.put("/updateAd/:id",upload, updateAd);     // Update
addRouter.delete("/deleteAd/:id", deleteAd);  // Delete

export default addRouter;
