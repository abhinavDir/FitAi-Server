import express from "express";
import { generateDietPlan } from "../Controllers/dietController.js";

const router = express.Router();

router.post("/generate", generateDietPlan);

export default router;