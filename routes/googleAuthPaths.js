// routes/authRoutes.js
import express from "express";
import { googleAuth,googleAuthCallback,logout } from "../ExternalAuth/googleAuth.js";

const googleRouter = express.Router();


googleRouter.get("/google",googleAuth);  // Starts OAuth // Authorization start here
googleRouter.get("/google/callback",googleAuthCallback); // Handles callback
googleRouter.get("/logout", logout);

export default googleRouter;
