import express from "express";
import {
  createMilestone,
  getProjectMilestones,
} from "../controllers/milestoneController.js";

const router = express.Router();

router.post("/create", createMilestone);
router.get("/project/:projectId", getProjectMilestones);

export default router;