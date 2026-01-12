'use client';

import { Quote } from "@/lib/types";
import { useState } from "react";
import { Copy, Check, Quote as QuoteIcon } from "lucide-react";
import { clsx } from "clsx";

interface QuoteCardProps {
    quote: Quote;
    index: number;
}

export default function QuoteCard({ quote, index }: QuoteCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(quote.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={clsx(
                "group relative flex flex-col justify-between p-8 min-h-[250px]",
                "bg-zinc-900 border border-zinc-800 rounded-2xl",
                "hover:border-zinc-700 transition-all duration-500",
                index === 0 ? "md:col-span-2 md:aspect-[2/1]" : ""
            )}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            <div className="relative">
                <QuoteIcon className="w-8 h-8 text-zinc-800 group-hover:text-zinc-600 transition-colors mb-6" />
                <p className={clsx(
                    "font-serif text-zinc-300 leading-snug group-hover:text-white transition-colors",
                    index === 0 ? "text-3xl md:text-4xl" : "text-xl"
                )}>
                    "{quote.content}"
                </p>
            </div>

            <div className="relative flex items-end justify-between mt-6 pt-6 border-t border-zinc-800/50">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
                        {quote.theme}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">
                        {quote.mood}
                    </span>
                </div>

                <button
                    onClick={handleCopy}
                    className="p-3 rounded-full bg-zinc-800 hover:bg-white text-zinc-400 hover:text-black transition-all duration-300 transform hover:rotate-12 hover:scale-110"
                    aria-label="Copy"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>
        </div>
    );
}
