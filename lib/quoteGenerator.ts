import Groq from "groq-sdk";
import { Quote, QuoteRequest } from "./types";

const SYSTEM_PROMPT = `
You are an intelligent AI quote generator.

Your task is to generate original, thoughtful, and high-quality quotes
based on a given theme and mood.

Rules:
- Quotes must be ORIGINAL (not famous or attributed to real people)
- Do NOT include emojis
- Do NOT include author names
- Avoid clichés and generic motivational language
- Each quote must feel human, reflective, and meaningful
- Maximum length per quote: 20 words
- Tone must strictly follow the given mood

Output format (STRICT — JSON ONLY, no markdown, no explanation):

{
  "theme": "<theme>",
  "mood": "<mood>",
  "quotes": [
    "Quote 1",
    "Quote 2",
    "Quote 3",
    "Quote 4",
    "Quote 5"
  ]
}

⚠️ Important:
If the model returns anything outside valid JSON, the response must be rejected.
`;

export const generateQuotes = async (request: QuoteRequest): Promise<Quote[]> => {
    const { theme, mood } = request;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("GROQ_API_KEY is missing in environment variables.");
        // Return a mock error or dummy data to prevent UI crash, but better to throw to show user the issue
        throw new Error("Missing API Key. Please add GROQ_API_KEY to your .env.local file.");
    }

    const groq = new Groq({ apiKey });

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Theme: ${theme}\nMood: ${mood}`
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content received from AI");
        }

        const result = JSON.parse(content);

        // Validation
        if (!result.quotes || !Array.isArray(result.quotes) || result.quotes.length !== 5) {
            throw new Error("Invalid response format: Expected 5 quotes.");
        }

        const validatedQuotes: Quote[] = result.quotes.map((q: string) => {
            if (q.length > 150) { // Approx 20 words check (loose char limit)
                console.warn("Quote exceeding length detected, but keeping for now: ", q);
            }
            return {
                content: q,
                theme: result.theme || theme,
                mood: result.mood || mood
            };
        });

        return validatedQuotes;

    } catch (error) {
        console.error("Error generating quotes:", error);
        // Fallback or re-throw
        throw error;
    }
};
