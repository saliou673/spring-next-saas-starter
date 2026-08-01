import { ArrowRight, TrendingDown } from "lucide-react";

const DESTINATIONS = [
    {
        city: "Paris",
        country: "France",
        price: "$189",
        duration: "~7h 30m",
        from: "New York",
        gradient: "from-violet-500 to-indigo-600",
        emoji: "🗼",
        direct: true,
    },
    {
        city: "Tokyo",
        country: "Japan",
        price: "$412",
        duration: "~14h",
        from: "Los Angeles",
        gradient: "from-rose-500 to-pink-600",
        emoji: "⛩️",
        direct: false,
    },
    {
        city: "Dubai",
        country: "UAE",
        price: "$298",
        duration: "~12h",
        from: "London",
        gradient: "from-amber-500 to-orange-600",
        emoji: "🌆",
        direct: true,
    },
    {
        city: "Bali",
        country: "Indonesia",
        price: "$540",
        duration: "~20h",
        from: "New York",
        gradient: "from-emerald-500 to-teal-600",
        emoji: "🌴",
        direct: false,
    },
    {
        city: "Barcelona",
        country: "Spain",
        price: "$220",
        duration: "~8h",
        from: "Chicago",
        gradient: "from-cyan-500 to-blue-600",
        emoji: "🏖️",
        direct: true,
    },
    {
        city: "New York",
        country: "USA",
        price: "$155",
        duration: "~7h",
        from: "London",
        gradient: "from-fuchsia-500 to-purple-600",
        emoji: "🗽",
        direct: true,
    },
];

const DEALS = [
    {
        tag: "48h deal",
        route: "London → Rome",
        discount: "40% OFF",
        price: "$89",
        oldPrice: "$149",
        accent: "bg-rose-500",
    },
    {
        tag: "Weekend special",
        route: "Paris → Berlin",
        discount: "25% OFF",
        price: "$64",
        oldPrice: "$86",
        accent: "bg-amber-500",
    },
    {
        tag: "Last minute",
        route: "NYC → Miami",
        discount: "35% OFF",
        price: "$79",
        oldPrice: "$122",
        accent: "bg-violet-600",
    },
];

export function Features() {
    return (
        <>
            {/* Popular destinations */}
            <section
                id="features"
                className="bg-slate-50 py-20 sm:py-28 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <p className="mb-1.5 text-sm font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                                Explore the world
                            </p>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Popular destinations
                            </h2>
                        </div>
                        <button className="hidden items-center gap-1 text-sm font-semibold text-violet-600 hover:underline sm:flex dark:text-violet-400">
                            View all destinations
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {DESTINATIONS.map((dest) => (
                            <div
                                key={dest.city}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-violet-200 dark:bg-zinc-900/60 dark:ring-white/[0.07] dark:hover:ring-violet-500/30"
                            >
                                {/* Destination image area */}
                                <div
                                    className={`relative flex h-40 items-end bg-gradient-to-br ${dest.gradient} p-5`}
                                >
                                    <span className="absolute right-4 top-4 text-5xl opacity-30">
                                        {dest.emoji}
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold text-white/70">
                                            {dest.country}
                                        </p>
                                        <p className="text-2xl font-extrabold text-white">
                                            {dest.city}
                                        </p>
                                    </div>
                                    {dest.direct && (
                                        <span className="absolute right-4 bottom-4 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                                            Direct
                                        </span>
                                    )}
                                </div>

                                {/* Card body */}
                                <div className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-zinc-500">
                                            From {dest.from} · {dest.duration}
                                        </p>
                                        <p className="mt-0.5 text-sm font-medium text-gray-500 dark:text-zinc-400">
                                            Round trip from
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                            {dest.price}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-zinc-500">
                                            per person
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center sm:hidden">
                        <button className="flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-400">
                            View all destinations
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Hot deals — booking.com style limited-time offers */}
            <section className="bg-white py-20 dark:bg-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <p className="mb-1.5 text-sm font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                                Limited time only
                            </p>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Hot flight deals
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                            <TrendingDown className="h-4 w-4" />
                            Prices dropping fast
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {DEALS.map((deal) => (
                            <div
                                key={deal.route}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900/60 dark:ring-white/[0.07]"
                            >
                                {/* Colored top stripe */}
                                <div className={`h-1.5 w-full ${deal.accent}`} />

                                <div className="p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white ${deal.accent}`}
                                        >
                                            {deal.tag}
                                        </span>
                                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                                            {deal.discount}
                                        </span>
                                    </div>

                                    <p className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                                        {deal.route}
                                    </p>

                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                            {deal.price}
                                        </span>
                                        <span className="mb-0.5 text-sm text-gray-400 line-through dark:text-zinc-500">
                                            {deal.oldPrice}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-400 dark:text-zinc-500">
                                        per person · round trip
                                    </p>

                                    <button className="mt-4 w-full rounded-xl border border-violet-200 py-2 text-sm font-semibold text-violet-600 transition-all hover:bg-violet-50 dark:border-violet-500/30 dark:text-violet-400 dark:hover:bg-violet-500/10">
                                        Book now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
