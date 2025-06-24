import express from "express"
import { createCategory,updateCategory,getAllCategories
    ,deleteCategory,getCategoryById
 } from "../controllers/categoryController.js";
import { Auth } from "../utils/jwtFunction.js";
import { vendor } from "../middlewares/AdminAcess.js";
const categoryRouter=express();
categoryRouter.post("/createCategory",Auth,vendor,createCategory);
categoryRouter.get("/getAllCategories",Auth,vendor,getAllCategories);
categoryRouter.put("/updateCategoryById",Auth,vendor,updateCategory);
categoryRouter.get("/deleteCategory",Auth,vendor,deleteCategory)
categoryRouter.get("/getCategoryByIg",Auth,vendor,getCategoryById)

export default categoryRouter;