import express from "express";
import { createDonation } from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create",protect, createDonation);

export default router;