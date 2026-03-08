const { generateAIResponse } = require("../services/aiService");
// Normal Tesing API for Google Gemini Integration
const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const aiReply = await generateAIResponse(message);

    res.json({
      success: true,
      reply: aiReply,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { askAI };
