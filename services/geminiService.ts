import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `
You are "Aether Bot", a helpful AI assistant living in the portfolio website of Edidiong Mfon, a passionate Frontend Engineer.
Your goal is to answer questions about Edidiong's projects, skills, and availability.
Edidiong specializes in React, TypeScript, and Creative Coding (WebGL/Three.js).
Edidiong considers code a form of craft and focuses on high-performance, beautiful interfaces.
Keep answers concise, professional, yet witty.
If asked about contact info, suggest using the email form or emailing 'templareddy@gmail.com'.
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my brain (API Key) is missing. Please configure the environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // We use gemini-2.5-flash for fast, responsive chat interactions
    const model = 'gemini-2.5-flash';

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "I processed that, but couldn't generate a text response.";

  } catch (error) {
    console.error("Error talking to Gemini:", error);
    return "I seem to be having trouble connecting to the neural network right now. Please try again later.";
  }
};