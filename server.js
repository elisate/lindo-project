import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import DocRouter from "./Documentation/Swagger.js";
import cors from "cors";

import mainRouter from "./routes/indexRouting.js";
import session from "express-session";
import passport from "./config/passportGoogle.js";
dotenv.config();
const app = express();

// environment variables
const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

// Define CORS options
const corsOptions = {
  origin: "*", // Accept requests from any origin
  optionsSuccessStatus: 200,
  credentials: true, // Allow cookies & authentication headers
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// ✅ Add session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "some_secret",
    resave: false,
    saveUninitialized: false,
  })
);

//✅ Initialize passport session
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const dbUri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hex2mmr.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
      console.log(   `Doc for swagger http://localhost:${port}/api-docs`);
   
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routes / Endpoints
app.use(bodyParser.json());

app.use("/", mainRouter);
app.use("/api-docs", DocRouter);
