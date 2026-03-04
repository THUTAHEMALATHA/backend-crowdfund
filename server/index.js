import Stripe from "stripe";
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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: "2023-10-16"
  }
);

app.post("/create-payment-intent", async (req, res) => {
  const { amount, projectId } = req.body;

  try {
      const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",
  line_items: [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "FundSpark Donation",
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    },
  ],
  success_url: "https://crowdfunding-frontend-two.vercel.app/success",
  cancel_url: "https://crowdfunding-frontend-two.vercel.app/cancel",
  metadata: {
    projectId: projectId,
  },
});


    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ message: "Stripe session failed" });
  }
});

//


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});