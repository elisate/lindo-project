// routes/authRoutes.js
import express from "express";
import { forgotPassword,resetPassword} from "../controllers/forgetPasswordController.js";

const resetRouter = express.Router();

resetRouter.post("/forgot-password", forgotPassword);
resetRouter.post("/reset-password/:token", resetPassword);


export default resetRouter;
