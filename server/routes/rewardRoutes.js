import express from "express";
import {
  createReward,
  getProjectRewards,
} from "../controllers/rewardController.js";

const router = express.Router();

router.post("/create", createReward);
router.get("/project/:projectId", getProjectRewards);

export default router;