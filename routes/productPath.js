import express from "express";

import {
  addOrUpdateProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,

} from "../controllers/productController.js";
import { Auth } from "../utils/jwtFunction.js";
import { vendor } from "../middlewares/AdminAcess.js";
import configureMulter from "../utils/multer.js";

const upload=configureMulter();

const productRouter = express();
productRouter.post("/createProduct", Auth,vendor,upload,addOrUpdateProduct);
productRouter.get("/getAllProduct", getAllProducts);
productRouter.delete("/deleteProductById",Auth,vendor,deleteProduct);
productRouter.put("/updateProductById",Auth,vendor,updateProduct);



export default productRouter;
