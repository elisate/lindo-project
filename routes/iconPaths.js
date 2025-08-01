// routes/iconRoutes.js
import express from "express";
import {
  createIcon,
  getIcons,
  getIconById,
  updateIcon,
  deleteIcon,
  getCategoryByIconId
} from "../controllers/iconController.js";
import configureMulter from "../utils/multer.js";

const upload = configureMulter();

const iconRouter = express.Router();

iconRouter.post("/createIcon", upload, createIcon);
iconRouter.get("/getIcons", getIcons);
iconRouter.get("/getIconById/:id", getIconById);
iconRouter.put("/updateIcon/:id", upload, updateIcon);
iconRouter.delete("/deleteIcon/:id", deleteIcon);
iconRouter.get("/getCategoryByIconId/:id", getCategoryByIconId); // ✅ NEW

export default iconRouter;
