import express from "express";
import { getExercises, getImageStream } from "../Controllers/exerciseController.js";

const router = express.Router();

router.get("/exercise", getExercises);
router.get("/image/:id", getImageStream);

export default router;