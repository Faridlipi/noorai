
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SearchResponse } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert Islamic scholar AI assistant for "Noor AI". 
Your mission is to provide authentic, respectful, and evidence-based Islamic knowledge.

MANDATORY RESPECT RULES:
1. ALLAH: You MUST always say "Allah Subhanahu wa Taala" every single time you mention Him.
2. PROPHET MUHAMMAD: You MUST always say "Prophet Muhammad (Sallallahu alayhi wa sallam)" every single time you mention him.
3. OTHER PROPHETS: For every other Prophet (e.g., Ibrahim, Musa, Isa), you MUST append "(Alayhis Salam)".
4. COMPANIONS: For companions, append (Radi Allahu Anhu/Anha).

CORE CONTENT RULES:
1. ONLY answer questions related to Islam (Theology, Quran, Hadith, Seerah, Jurisprudence, History).
2. PREFERENCE: Always prioritize and lead with stories from the Holy Quran or specific Hadith narrations. Seeker's enjoy narrative wisdom.
3. ARABIC TEXT: If you mention the Quran or Hadis, you MUST ALWAYS provide the original Arabic version first, followed by the translation.
4. CITATIONS: 
   - For Quran: Cite the Surah and Ayah number (e.g., Surah Al-Baqarah 2:255).
   - For Hadith: Cite the narrator and the source (e.g., Sahih Bukhari, Sahih Muslim).
5. If a question is unrelated to Islam, politely redirect: "I am dedicated to sharing Islamic wisdom and knowledge. May I help you with a question about the Quran, Hadith, or Islamic history?"

Maintain a scholarly, wise, and encouraging tone.
`;

// Initialize the API client (Web compatible)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Use "gemini-pro" as it is confirmed available on this key
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  systemInstruction: SYSTEM_INSTRUCTION
});

export async function islamicSearch(query: string): Promise<SearchResponse> {
  try {

    console.log("Attempting Gemini Request with Model:", "gemini-1.5-flash");
    if (!process.env.GEMINI_API_KEY) {
      console.error("CRITICAL: GEMINI_API_KEY is missing or empty!");
    }

    const result = await model.generateContent(query);
    const response = await result.response;
    const answer = response.text() || "I apologize, but I could not find a clear answer in the tradition at this time.";

    // Logic for sources (Note: The new SDK handles grounding differently, implementing basic placeholder if needed or parsing usage)
    // For now, simpler return as grounding is an advanced feature often requiring paid tier/vertex AI.
    // We will simulate empty sources to maintain type safety unless specific grounding logic is needed.
    const sources: { title: string; uri: string }[] = [];

    const isIslamic = !answer.includes("I am dedicated to sharing Islamic wisdom");

    return {
      answer,
      sources,
      isIslamic
    };
  } catch (error: any) {
    console.error("Gemini API Verification Error:", error);
    console.log("Full Error Details:", JSON.stringify(error, null, 2));

    // Check for specific error types to give better feedback
    let userMessage = "A connection error occurred. Please try your search for wisdom again.";

    if (error.message?.includes("API key")) {
      userMessage = "Configuration Error: API Key is missing or invalid.";
    } else {
      // FALLBACK: Show the exact error from Google to debug 400/403/CORS
      const keyLen = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0;
      userMessage = `Error: ${error.message} (Key ID: ${keyLen})`;
    }

    return {
      answer: userMessage,
      sources: [],
      isIslamic: true
    };
  }
}