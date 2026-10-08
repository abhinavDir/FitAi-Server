import model from "../Config/gemini.js";

export const chatWithCoach = async (req, res) => {
  try {
    const { history, message } = req.body;

    // Filter and map history. 
    // We expect history to contain all messages including the latest user message at the end.
    let formattedHistory = (history || [])
      .filter(msg => msg.content && msg.content.trim() !== "")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

    // Remove the current 'message' from the history to avoid duplication
    // since we will pass it specifically to sendMessageStream
    if (formattedHistory.length > 0 && 
        formattedHistory[formattedHistory.length - 1].parts[0].text === message) {
      formattedHistory.pop();
    }

    // Gemini history MUST start with 'user'. 
    // If the frontend initial model greeting is first, we remove it.
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    // Ensure alternating roles after shift. If next is model, shift again.
    // (Though usually it will be user-model-user...)
    
    const systemPrompt = "You are 'FitCoach 2.5', a high-precision performance AI. MISSION: Provide accurate, medically-sound, and extremely concise fitness/nutrition advice. RULES: 1. Max 100 words per response. 2. No filler text or AI-clichés. 3. Use bolding for key metrics. 4. Focus strictly on requested data. 5. Maintain elite, professional authority.";

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "FitCoach elite status active. I'm ready to help you dominate your fitness goals. What's our first move?" }] },
        ...formattedHistory
      ],
    });

    const result = await chat.sendMessageStream(message);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }

    res.end();
  } catch (error) {
    console.error("Coach Error:", error);
    if (!res.headersSent) {
      res.status(503).json({
        message: "FitCoach is taking a quick breather. Please try again in a moment.",
        error: error.message
      });
    } else {
      res.end(`\n\n[Coach disconnected.]`);
    }
  }
};
