import express from "express";
import mongoose from "mongoose";
import morgan from 'morgan';
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv-safe";
import helmet from "helmet";
import { registerUser, loginUser } from "./controllers/userController.js";
import { createEmail } from "./controllers/emailController.js";
import { verifyAuth } from "./middleware/VerifyAuth.js";

const app = express();

dotenv.config();

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());


app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

// Routes
app.post("/user/register", registerUser);
app.post("/user/login", loginUser);
app.post("/emails", verifyAuth, createEmail);

app.use((err, req, res, next) => {
  console.error("An error occurred:", err); // Log the actual error
  res.status(500).send("Something broke!");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    app.listen(process.env.EXPRESS_PORT, () => {
      console.log(`Server running on port ${process.env.EXPRESS_PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
