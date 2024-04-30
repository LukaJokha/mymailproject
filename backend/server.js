import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { registerUser, loginUser } from "./controllers/userController.js";
import { createEmail } from "./controllers/emailController.js";
import { verifyAuth } from "./middleware/VerifyAuth.js";

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4,
      sameSite: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.post("/user/register", registerUser);
app.post("/user/login", loginUser);
app.post("/emails", verifyAuth, createEmail);

app.listen(process.env.EXPRESS_PORT, async () => {
  console.log("Server running...");
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
});