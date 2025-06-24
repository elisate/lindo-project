import express from "express"
import { register,login } from "../controllers/userController.js";

const userRouter=express();
userRouter.post("/Register",register);
userRouter.post("/Login",login);

export default userRouter;