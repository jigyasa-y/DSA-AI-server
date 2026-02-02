import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

app.get("/chat", (req, res) => {
  res.send("Chat API is working");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a Data Structure and Algorithm instructor.
If question is NOT related to DSA, reply I cant help with this`
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error(error);
    res.json({ reply: "Error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
