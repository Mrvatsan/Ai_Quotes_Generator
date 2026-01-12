'use client';

import { useState, useTransition } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import QuoteCard from "@/components/QuoteCard";
import { Quote } from "@/lib/types";
import { submitQuoteRequest } from "@/app/actions";

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await submitQuoteRequest(null, formData);
        if (result.error) {
          setError(result.error);
        } else if (result.quotes) {
          setQuotes(result.quotes);
        }
      } catch (e) {
        setError("Failed to generate quotes. Please check your API key.");
      }
    });
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">

      {/* Ambient Background - Fixed */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[150px] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col gap-16 max-w-7xl">

        {/* Header - Minimal & Large */}
        <header className="flex flex-col items-center justify-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase backdrop-blur-md">
            Experiment v.03
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Quote<span className="text-zinc-600">Gen</span>.
          </h1>

          <p className="max-w-xl text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
            AI-powered wisdom synthesis. Input your parameters below.
          </p>
        </header>

        {/* Form Area - The "Split Box" Layout */}
        <div className="w-full max-w-4xl mx-auto">
          <GeneratorForm action={handleFormSubmit} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200 text-center text-sm font-light tracking-wide">
            Error: {error}
          </div>
        )}

        {/* Results Grid - Masonry-ish */}
        {quotes.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {quotes.map((quote, idx) => (
              <QuoteCard key={idx} quote={quote} index={idx} />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
