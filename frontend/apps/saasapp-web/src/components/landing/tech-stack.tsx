const AIRLINES = [
    { name: "Air France", abbr: "AF" },
    { name: "Emirates", abbr: "EK" },
    { name: "Lufthansa", abbr: "LH" },
    { name: "Turkish Airlines", abbr: "TK" },
    { name: "British Airways", abbr: "BA" },
    { name: "Qatar Airways", abbr: "QR" },
    { name: "Singapore Air", abbr: "SQ" },
    { name: "Delta Airlines", abbr: "DL" },
    { name: "United Airlines", abbr: "UA" },
    { name: "KLM", abbr: "KL" },
];

export function TechStack() {
    return (
        <section className="border-b border-gray-200 bg-white py-10 dark:border-white/[0.06] dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <p className="mb-6 text-center text-xs font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-600">
                    We search hundreds of airlines including
                </p>

                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-black" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-black" />

                    <div className="flex gap-0 overflow-hidden">
                        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8">
                            {AIRLINES.map((a) => (
                                <div
                                    key={a.name}
                                    className="flex shrink-0 items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-extrabold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                                        {a.abbr}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                                        {a.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div
                            aria-hidden="true"
                            className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8"
                        >
                            {AIRLINES.map((a) => (
                                <div
                                    key={a.name}
                                    className="flex shrink-0 items-center gap-2 opacity-60"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-[10px] font-extrabold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                                        {a.abbr}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                                        {a.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
