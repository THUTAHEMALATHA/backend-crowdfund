import Razorpay from "razorpay";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./config/supabaseClient.js";
import projectRoutes from "./routes/projectRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("projects1")
    .select("*")
    .limit(1);
    
  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  res.json({
    success: true,
    data,
  });
});
// 
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});
  
app.post("/create-order", async (req, res) => {
  try {

    const { amount, projectId } = req.body;
     console.log("Donation amount")
    const options = {
      amount: Number(amount) * 100, 
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

//


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});