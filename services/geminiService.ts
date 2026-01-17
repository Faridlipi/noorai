
import { GoogleGenAI } from "@google/genai";
import { SearchResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export async function islamicSearch(query: string): Promise<SearchResponse> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const answer = response.text || "I apologize, but I could not find a clear answer in the tradition at this time.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "Scholarly Reference",
        uri: chunk.web.uri,
      }));

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