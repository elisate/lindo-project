import { createBanner,getProductsByBanner,
    getAllBanners,getBannerById,deleteBanner,updateBanner,getCategoryByBanner
} from "../controllers/bannerController.js";
import express from "express"
import { Auth } from "../utils/jwtFunction.js";
import configurationMulter from "../utils/multerForGalley.js";
const bannerRouter=express();
const upload=configurationMulter();
bannerRouter.post("/createBanner",upload,createBanner);
bannerRouter.get("/:bannerId/products", getProductsByBanner);
// READ ALL
bannerRouter.get("/getAllBanners", getAllBanners);

// READ ONE
bannerRouter.get("/getBannerById/:bannerId", getBannerById);

// UPDATE
bannerRouter.put("/updateBanner/:bannerId", upload, updateBanner);

bannerRouter.delete("/deleteBanner/:bannerId", deleteBanner);
bannerRouter.get("/getCategoryByBanner/:bannerId", getCategoryByBanner);

export default bannerRouter;