import express from "express";
import { getProfile, updateProfile, addPoint } from "../Controllers/userController.js";
import isAuth from "../Middlewares/isAuth.js";

const router = express.Router();

router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, updateProfile);
router.post("/activity", isAuth, addPoint);

export default router;
