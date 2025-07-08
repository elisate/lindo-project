import express from "express"
import { createCategory,updateCategory,getAllCategories
    ,deleteCategory,getCategoryById
 } from "../controllers/categoryController.js";
// import { Auth } from "../utils/jwtFunction.js";
// import { vendor } from "../middlewares/AdminAcess.js";
const categoryRouter=express();
categoryRouter.post("/createCategory",createCategory);
categoryRouter.get("/getAllCategories",getAllCategories);
categoryRouter.put("/updateCategoryById/:id",updateCategory);
categoryRouter.delete("/deleteCategory",deleteCategory)
categoryRouter.get("/getCategoryByIg/:id",getCategoryById)

export default categoryRouter;