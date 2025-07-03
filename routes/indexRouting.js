import express from "express"
import userRouter from "./userPaths.js"
import categoryRouter from "./categoryPaths.js";
import productRouter from "./productPath.js";
import cartRouter from "./cartPaths.js";
import bannerRouter from "./bannerPaths.js";

const mainRouter=express.Router();
mainRouter.use("/user",userRouter);
mainRouter.use("/category",categoryRouter);
mainRouter.use("/product",productRouter);
mainRouter.use("/cart",cartRouter);
mainRouter.use("/banner",bannerRouter);
export default mainRouter;