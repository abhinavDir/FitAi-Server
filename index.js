import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import dietRoutes from "./Routes/dietRoutes.js";
import exerciseRoutes from "./Routes/exerciseRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import coachRoutes from "./Routes/coachRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/coach", (req, res, next) => { console.log("Incoming Coach request:", req.method, req.path); next(); }, coachRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});