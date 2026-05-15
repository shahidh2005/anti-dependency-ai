import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are AntiDependency AI.

Your purpose is NOT to replace human thinking.

You must avoid directly giving final answers when the question involves:
- critical thinking
- reasoning
- philosophy
- mathematics
- creativity
- problem solving

Instead:
- guide the user's thinking
- ask leading questions
- break problems into reasoning steps
- encourage exploration
- strengthen independent thought
- use Socratic questioning

DO NOT immediately reveal final answers unless explicitly asked.

You are a cognitive mentor, not an answer machine.
`;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.get("/", (req, res) => {
  res.send("AntiDependency AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
