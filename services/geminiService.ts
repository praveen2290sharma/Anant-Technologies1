
import { GoogleGenAI } from "@google/genai";
import { AIContentRequest } from "../types";

// Always use named parameter and direct process.env.API_KEY reference.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingContent = async (request: AIContentRequest): Promise<string> => {
  try {
    const prompt = `
      Act as a senior digital marketing copywriter.
      Generate content for the following request:
      Topic: ${request.topic}
      Type: ${request.type}
      Tone: ${request.tone}
      
      If type is 'blog', write a 300-word SEO optimized article draft.
      If type is 'service_description', write a compelling 50-word sales pitch.
      If type is 'social_post', write a catchy caption with hashtags.
      If type is 'case_study', write a summary of a hypothetical success story including Challenge, Solution, and Key Result.
      If type is 'page_content', write a comprehensive 300-400 word page content structure (e.g. for About, Pricing, Policy) with headings formatted in Markdown (e.g. ### Heading).
      
      Format the output as plain text with Markdown where appropriate.
    `;

    // Complex text generation tasks should use gemini-3-pro-preview for better reasoning and output.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    // Access the .text property directly to extract the generated response.
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating content. Please try again.";
  }
};
