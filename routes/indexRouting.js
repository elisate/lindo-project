import express from "express"
import userRouter from "./userPaths.js"
import categoryRouter from "./categoryPaths.js";
import productRouter from "./productPath.js";

const mainRouter=express.Router();
mainRouter.use("/user",userRouter);
mainRouter.use("/category",categoryRouter);
mainRouter.use("/product",productRouter);
export default mainRouter;