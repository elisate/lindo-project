import { createBanner,getProductsByBanner } from "../controllers/bannerController.js";
import express from "express"
import { Auth } from "../utils/jwtFunction.js";
import configurationMulter from "../utils/multerForGalley.js";
const bannerRouter=express();
const upload=configurationMulter();
bannerRouter.post("/createBanner",upload,createBanner);
bannerRouter.get('/:bannerId/products', getProductsByBanner);

export default bannerRouter;