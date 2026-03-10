const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/gemini-answer", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateMessage",
      {
        prompt: {
          messages: [
            {
              author: "user",
              content: question, // The user's question
            },
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY, // Ensure the API key is set correctly in .env
        },
      }
    );




    // Extract AI response
    const aiResponse = response.data.candidates[0]?.content || "No response generated.";
    res.json({ success: true, answer: aiResponse });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Error processing your query." });
  }
});

module.exports = router;
