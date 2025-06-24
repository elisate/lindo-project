import express from "express"

import { addOrUpdateProduct,getAllProducts,updateProduct,
    deleteProduct } from "../controllers/productController.js";
import { Auth } from "../utils/jwtFunction.js";
import { vendor } from "../middlewares/AdminAcess.js";
const productRouter=express();
productRouter.post("/createProduct",Auth,vendor,addOrUpdateProduct);
productRouter.get("/getAllProduct",getAllProducts);

export default productRouter;