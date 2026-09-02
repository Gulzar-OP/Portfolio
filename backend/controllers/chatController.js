// controllers/chatController.js

import { gulzarProfile } from "../data/gulzarProfile.js";

export const askGulzar = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const safeHistory = history
      .slice(-6)
      .filter(
        (item) =>
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string",
      );

    const systemPrompt = `
    You are "Ask Gulzar", the portfolio assistant of Gulzar Hussain.

    Rules:
    1. Always answer in clear, professional English.
    2. Never respond in Hindi, Hinglish, or any other language.
    3. Provide only the final answer without reasoning.
    4. Keep normal answers concise.
        For project explanations, architecture, features, or technical questions,
        you may use up to 250 words when necessary.
    5. Use only the supplied profile information.
    6. Never convert target roles into current employment.
    7. Never claim Gulzar is an intern unless explicitly stated.
    8. When answering questions about projects:
        - Explain what the project does.
        - Mention its main technologies when relevant.
        - Mention architecture and important features when relevant.
        - Explain the user's contribution only from supplied profile information.
        - Do not invent users, deployment statistics, revenue, usage numbers,
        production traffic, customers, or features not included in the profile.
    9. If information is unavailable, say:
    "This information is not available in Gulzar's portfolio."

    GULZAR PROFILE:
    ${JSON.stringify(gulzarProfile, null, 2)}
    `;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: process.env.HF_MODEL,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },

            ...safeHistory,

            {
              role: "user",
              content: `${message.trim()} /no_think`,
            },
          ],

          temperature: 0.3,
          max_tokens: 300,
          stream: false,

          chat_template_kwargs: {
            enable_thinking: false,
          },
        }),
      },
    );

    const data = await response.json();

    console.log("HF STATUS:", response.status);

    console.log("HF RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message:
          data?.error?.message ||
          data?.error ||
          data?.message ||
          "Hugging Face request failed",
        details: data,
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({
        success: false,
        message: "Invalid response received from AI model",
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Chatbot is temporarily unavailable",
    });
  }
};
