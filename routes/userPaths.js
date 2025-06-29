import express from "express"
import { register,login } from "../controllers/userController.js";
import configureMulter from "../utils/multer.js";
const upload=configureMulter();
const userRouter=express();
userRouter.post("/Register",upload,register);
userRouter.post("/Login",login);

export default userRouter;