import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // Note: The SDK might not have a direct listModels, but we can try to fetch it via the base API if needed.
    // However, usually we can just test common model strings.
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const result = await model.generateContent("test");
        console.log(`MODEL ${m} IS ACTIVE:`, result.response.text().substring(0, 10));
      } catch (err) {
        console.log(`MODEL ${m} ERROR:`, err.message);
      }
    }
  } catch (error) {
    console.error("General Error:", error);
  }
}

listModels();
