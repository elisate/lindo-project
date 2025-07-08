import express from "express"
import { register,login,getAllUsers,getUserById,deleteUser,updateUser } from "../controllers/userController.js";
import configureMulter from "../utils/multer.js";
const upload=configureMulter();
const userRouter=express();
userRouter.post("/Register",upload,register);
userRouter.post("/Login",login);
userRouter.get("/getUserById",getUserById);
userRouter.get("/getAllUsers",getAllUsers);
userRouter.delete("/deleteUserById",deleteUser);
userRouter.put("/updateUserById",updateUser);

export default userRouter;