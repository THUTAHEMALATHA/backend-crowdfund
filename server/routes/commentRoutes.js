import express from "express";
import {
  createComment,
  getProjectComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/project/:projectId", getProjectComments);

export default router;