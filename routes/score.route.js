import express from "express";
import {
  createScore,
  getAllScores,
  getSingleScore,
} from "../controller/score.controller.js";
const router = express.Router();

router.post("/create", createScore);
router.get("/getAll", getAllScores);
router.get("/:id", getSingleScore);

export default router;
