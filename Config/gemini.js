import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Use gemini-2.5-flash as requested by the user and verified to have available quota.
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default model;