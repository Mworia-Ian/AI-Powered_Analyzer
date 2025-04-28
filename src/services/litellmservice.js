import axios from "axios";

const API_URL = "http://82.29.190.188:4000/v1/chat/completions";
const API_KEY = import.meta.env.VITE_LITELLM_API_KEY;

const analyzeDocument = async (documentContent, userPrompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a document analysis assistant. Be clear and use as few words as possible.",
          },
          {
            role: "user",
            content: `${userPrompt}\n\nDocument content: ${documentContent}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw error;
  }
};

const litellmService = {
  analyzeDocument,
};

export default litellmService;
