import express from "express"
import { createCategory,updateCategory,getAllCategories
    ,deleteCategory,getCategoryById
 } from "../controllers/categoryController.js";
import { Auth } from "../utils/jwtFunction.js";
import { vendor } from "../middlewares/AdminAcess.js";
const categoryRouter=express();
categoryRouter.post("/createCategory",createCategory);
categoryRouter.get("/getAllCategories",getAllCategories);
categoryRouter.put("/updateCategoryById",updateCategory);
categoryRouter.get("/deleteCategory",deleteCategory)
categoryRouter.get("/getCategoryByIg",getCategoryById)

export default categoryRouter;