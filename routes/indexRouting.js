import express from "express"
import userRouter from "./userPaths.js"
import categoryRouter from "./categoryPaths.js";
import productRouter from "./productPath.js";
import cartRouter from "./cartPaths.js";
import bannerRouter from "./bannerPaths.js";
import wishlistRouter from "./wishlistPath.js";
import googleRouter from "./googleAuthPaths.js";
import addRouter from "./addPaths.js";
import iconRouter from "./iconPaths.js";
import orderRouter from "./orderPaths.js";
import resetRouter from "./resetPasswordPaths.js";
const mainRouter=express.Router();
mainRouter.use("/user",userRouter);
mainRouter.use("/category",categoryRouter);
mainRouter.use("/product",productRouter);
mainRouter.use("/cart",cartRouter);
mainRouter.use("/banner",bannerRouter);
mainRouter.use("/wishlist",wishlistRouter);
mainRouter.use("/auth",googleRouter);
mainRouter.use("/adds",addRouter);
mainRouter.use("/icons",iconRouter)
mainRouter.use("/orders",orderRouter)
mainRouter.use("/",resetRouter);
export default mainRouter;