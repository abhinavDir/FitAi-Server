import express from "express";
import { chatWithCoach } from "../Controllers/coachController.js";

const router = express.Router();

router.post("/chat", chatWithCoach);

export default router;
