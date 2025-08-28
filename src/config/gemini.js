import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const DEFAULT_API_KEY = "your-default-key-here"; // Remove this in production!


const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || DEFAULT_API_KEY;

if (!API_KEY || API_KEY === "your-default-key-here") {
  console.error("API key is not properly configured");
  
}

async function runChat(prompt) {
  // Validate input
  if (!prompt || typeof prompt !== 'string') {
    throw new Error("Invalid prompt provided");
  }

  try {
    // Initialize the Generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Configuration
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Start chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    return response.text();

  } catch (error) {
    console.error("Error in runChat:", error);
    
    if (error.message.includes("API key not valid")) {
      throw new Error("Invalid API key. Please check your configuration.");
    } else if (error.message.includes("quota")) {
      throw new Error("API quota exceeded. Please try again later.");
    } else {
      throw new Error("Failed to get response from AI. Please try again.");
    }
  }
}

export default runChat;
