
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
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTION
});

export async function islamicSearch(query: string): Promise<SearchResponse> {
  try {
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
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      answer: "A connection error occurred. Please try your search for wisdom again.",
      sources: [],
      isIslamic: true
    };
  }
}