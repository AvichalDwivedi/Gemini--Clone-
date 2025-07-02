import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// const apikey = "AIzaSyCbhZUtCbn7WTJroFK-3l7RChONjrj-z4o";
// npm install @google/generative-ai

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");

// const MODEL_NAME = "gemini-1.0-pro";

const MODEL_NAME = "gemini-1.5-flash"; // Updated to the latest model version
const API_KEY = "AIzaSyCbhZUtCbn7WTJroFK-3l7RChONjrj-z4o";

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    // const result = await chat.sendMessage(prompt);
    // const response = result.response;
    // console.log(response.text());

    try {
        const result = await chat.sendMessage(prompt);
        const response = result.response;
        console.log(response.text());
        return response.text();
    } catch (error) {
        console.error("Error during chat:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export default runChat;
