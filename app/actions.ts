'use server'

import { generateQuotes } from "@/lib/quoteGenerator";
import { QuoteRequest } from "@/lib/types";

export async function submitQuoteRequest(previousState: any, formData: FormData) {
    const theme = formData.get("theme") as string;
    const mood = formData.get("mood") as string;

    if (!theme || !mood) {
        return { error: "Theme and Mood are required." };
    }

    const request: QuoteRequest = { theme, mood };
    const quotes = await generateQuotes(request);

    return { quotes };
}
