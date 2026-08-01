"use client";

import { useState } from "react";
import {
    PlaneTakeoff,
    PlaneLanding,
    Calendar,
    Users,
    ArrowLeftRight,
    Search,
} from "lucide-react";

const TRIP_TYPES = ["Round trip", "One way", "Multi-city"] as const;
type TripType = (typeof TRIP_TYPES)[number];

export function Hero() {
    const [tripType, setTripType] = useState<TripType>("Round trip");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const swapCities = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 pb-32 pt-28 dark:from-violet-950 dark:via-violet-900 dark:to-indigo-950">
            {/* Pattern */}
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-black" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                {/* Headline */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                        <PlaneTakeoff className="h-4 w-4" />
                        Best fares guaranteed
                    </div>
                    <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Where do you
                        <span className="mt-2 block text-violet-200">
                            want to fly?
                        </span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
                        Search hundreds of airlines and travel sites to find the
                        cheapest flights — all in one place.
                    </p>
                </div>

                {/* Flight search widget */}
                <div className="mx-auto max-w-5xl rounded-2xl bg-white p-4 shadow-2xl shadow-black/30 dark:bg-zinc-900">
                    {/* Trip type tabs */}
                    <div className="mb-4 flex gap-1 border-b border-gray-100 pb-3 dark:border-white/[0.07]">
                        {TRIP_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => setTripType(type)}
                                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                                    tripType === type
                                        ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Input row */}
                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* From */}
                        <div className="relative flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200 transition-all focus-within:ring-2 focus-within:ring-violet-400 dark:bg-zinc-800 dark:ring-white/10 dark:focus-within:ring-violet-500">
                            <PlaneTakeoff className="h-5 w-5 shrink-0 text-violet-500" />
                            <div className="flex-1 min-w-0">
                                <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-500">
                                    From
                                </p>
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    placeholder="City or airport"
                                    className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none dark:text-white dark:placeholder-zinc-500"
                                />
                            </div>
                        </div>

                        {/* Swap button */}
                        <button
                            onClick={swapCities}
                            className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-violet-300 hover:text-violet-600 lg:self-center dark:border-white/10 dark:bg-zinc-800 dark:hover:border-violet-500 dark:hover:text-violet-400"
                            aria-label="Swap cities"
                        >
                            <ArrowLeftRight className="h-4 w-4" />
                        </button>

                        {/* To */}
                        <div className="relative flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200 transition-all focus-within:ring-2 focus-within:ring-violet-400 dark:bg-zinc-800 dark:ring-white/10 dark:focus-within:ring-violet-500">
                            <PlaneLanding className="h-5 w-5 shrink-0 text-indigo-500" />
                            <div className="flex-1 min-w-0">
                                <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-500">
                                    To
                                </p>
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    placeholder="City or airport"
                                    className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 outline-none dark:text-white dark:placeholder-zinc-500"
                                />
                            </div>
                        </div>

                        {/* Departure */}
                        <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200 transition-all focus-within:ring-2 focus-within:ring-violet-400 dark:bg-zinc-800 dark:ring-white/10 dark:focus-within:ring-violet-500">
                            <Calendar className="h-5 w-5 shrink-0 text-gray-400" />
                            <div className="flex-1 min-w-0">
                                <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-500">
                                    Departure
                                </p>
                                <input
                                    type="date"
                                    className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                />
                            </div>
                        </div>

                        {/* Return (only for round trip) */}
                        {tripType === "Round trip" && (
                            <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200 transition-all focus-within:ring-2 focus-within:ring-violet-400 dark:bg-zinc-800 dark:ring-white/10 dark:focus-within:ring-violet-500">
                                <Calendar className="h-5 w-5 shrink-0 text-gray-400" />
                                <div className="flex-1 min-w-0">
                                    <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-500">
                                        Return
                                    </p>
                                    <input
                                        type="date"
                                        className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Passengers */}
                        <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5 ring-1 ring-gray-200 dark:bg-zinc-800 dark:ring-white/10">
                            <Users className="h-5 w-5 shrink-0 text-gray-400" />
                            <div className="flex-1 min-w-0">
                                <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-zinc-500">
                                    Passengers
                                </p>
                                <select className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none dark:text-white">
                                    <option>1 Adult, Economy</option>
                                    <option>2 Adults, Economy</option>
                                    <option>1 Adult, Business</option>
                                    <option>2 Adults, Business</option>
                                    <option>Family (2+2)</option>
                                </select>
                            </div>
                        </div>

                        {/* Search button */}
                        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-500/30 transition-all hover:bg-violet-500 active:scale-95 lg:self-stretch">
                            <Search className="h-4 w-4" />
                            Search flights
                        </button>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-violet-100 sm:gap-10">
                    {[
                        "✈ 500+ airlines",
                        "💰 Best price guarantee",
                        "🔒 Secure booking",
                        "📞 24/7 support",
                    ].map((item) => (
                        <span key={item} className="text-sm font-medium">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
