import express from "express";
import { createEmail } from "../controllers/emailController.js";
import { verifyAuth } from "../middleware/VerifyAuth.js";
import { formatDate } from "../utils/dateUtils.js";

const router = express.Router();

router.post("/", verifyAuth, createEmail);

export default router;