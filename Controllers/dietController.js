import model from "../Config/gemini.js";

export const generateDietPlan = async (req, res) => {
  try {
    const { age, weight, height, goal, budgetType, budget, dietType, language } = req.body;
    console.log("Generating diet for:", { age, weight, height, goal, budgetType, budget, dietType, language });

    let budgetContext = "No strict budget provided. Focus on a generally balanced, moderate-cost diet.";
    let targetCostText = "a standard balanced budget";

    if (budget && budget.trim() !== "") {
      const typeLabel = budgetType === "Daily" ? "per day" : "per month";
      budgetContext = `Strict Maximum ${budgetType} Budget: ₹${budget} INR ${typeLabel}. (You MUST explicitly build the plan around realistically priced, locally available grocery items so the total cost strictly and genuinely stays under ₹${budget} INR ${typeLabel}.)`;
      targetCostText = `₹${budget} ${typeLabel}`;
    }

    const prompt = `
    Act as a professional, highly experienced clinical nutritionist. Create a highly personalized, genuine, and practical daily diet plan for a client based on the following specific details:
    - Age: ${age} years old
    - Weight: ${weight} kg
    - Height: ${height} cm
    - Fitness Goal: ${goal}
    - ${budgetContext}
    - Dietary Preference: ${dietType} (ONLY suggest foods that strictly fall under ${dietType})

    IMPORTANT LANGUAGE RULE: Explicitly generate the entire following diet plan natively in ${language || "English"}.

    Structure the response clearly with sections for:
    1. Introduction (Brief, empathetic, and encouraging)
    2. Breakfast
    3. Lunch
    4. Dinner
    5. Snacks (optional, depending on budget and goal)
    6. Nutritional Advice & Practical Tips
    
    CRITICAL INSTRUCTION: You represent a genuine financial and nutritional calculator. At the very end of the response, include a section formatted EXACTLY like this (do not change the header):
    ### ESTIMATED COST SUMMARY
    - Daily Spend: ₹[amount]
    - Weekly Spend: ₹[amount]
    - Monthly Spend: ₹[amount]
    (Replace [amount] with highly realistic and accurately calculated ranges in INR based strictly on the requested budget constraint: ${targetCostText}. Ensure Monthly Spend mathematically matches Daily Spend * 30.)
    `;

    console.log("Waiting for Gemini response Block (Stable)...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Check if the response was blocked by safety filters
    if (response.promptFeedback && response.promptFeedback.blockReason) {
      throw new Error(`Response blocked by safety filters: ${response.promptFeedback.blockReason}`);
    }

    const plan = response.text();
    if (!plan) {
      throw new Error("Gemini returned an empty response. Please try again.");
    }

    console.log("Diet generated successfully");
    res.json({ plan });
  } catch (error) {
    console.error("Gemini Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        message: "Error generating diet plan: " + error.message,
        error: error.message
      });
    }
  }
};