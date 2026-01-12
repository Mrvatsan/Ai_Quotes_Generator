'use client';

import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2, Command } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <div className="col-span-1 md:col-span-2 flex justify-center mt-8">
            <button
                type="submit"
                disabled={pending}
                className="group relative inline-flex h-16 w-full md:w-auto min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:w-[220px] hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:w-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-pink-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-3">
                    {pending ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="tracking-wide">SYNTHESIZING...</span>
                        </>
                    ) : (
                        <>
                            <span className="tracking-wide">GENERATE</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                    )}
                </span>
            </button>
        </div>
    );
}

export default function GeneratorForm({ action }: { action: (payload: FormData) => void }) {
    return (
        <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* THEME BOX */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full flex flex-col justify-between p-8">
                    <label htmlFor="theme" className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-purple-400 transition-colors">
                        Input 01
                    </label>
                    <div className="space-y-4">
                        <h3 className="text-3xl font-light text-zinc-400 group-focus-within:text-white transition-colors">
                            The <strong className="font-bold text-white">Topic</strong>
                        </h3>
                        <input
                            id="theme"
                            name="theme"
                            type="text"
                            placeholder="e.g. Resilience"
                            className="w-full bg-transparent text-4xl md:text-5xl font-bold placeholder:text-zinc-800 text-white focus:outline-none focus:placeholder:text-zinc-700/0 transition-all"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-purple-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                </div>
            </div>

            {/* MOOD BOX */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-900/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full flex flex-col justify-between p-8">
                    <label htmlFor="mood" className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-pink-400 transition-colors">
                        Input 02
                    </label>
                    <div className="space-y-4">
                        <h3 className="text-3xl font-light text-zinc-400 group-focus-within:text-white transition-colors">
                            The <strong className="font-bold text-white">Vibe</strong>
                        </h3>
                        <input
                            id="mood"
                            name="mood"
                            type="text"
                            placeholder="e.g. Stoic"
                            className="w-full bg-transparent text-4xl md:text-5xl font-bold placeholder:text-zinc-800 text-white focus:outline-none focus:placeholder:text-zinc-700/0 transition-all"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-pink-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                </div>
            </div>

            <SubmitButton />

        </form>
    );
}
