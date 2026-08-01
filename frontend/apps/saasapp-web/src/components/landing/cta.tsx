import { ArrowRight, Bell, Gift } from "lucide-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="bg-slate-50 py-20 sm:py-28 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Price alert banner — like booking.com's Genius banner */}
                <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600">
                    <div className="flex flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                <Bell className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-white">
                                    Never miss a flight deal again
                                </p>
                                <p className="text-sm text-violet-200">
                                    Set a price alert and we'll notify you when
                                    fares drop on your route.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/sign-up"
                            className="shrink-0 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-violet-700 shadow-lg transition-all hover:bg-violet-50 active:scale-95"
                        >
                            Set price alert
                        </Link>
                    </div>
                </div>

                {/* Loyalty / rewards card */}
                <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-zinc-900/60 dark:ring-white/[0.07]">
                    <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/30">
                            <Gift className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1 text-lg font-extrabold text-gray-900 dark:text-white">
                                Join SkyRewards and earn on every flight
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-zinc-400">
                                Create a free account and collect points on
                                every booking. Redeem them for free flights,
                                seat upgrades, and exclusive lounge access.
                            </p>
                        </div>
                        <Link
                            href="/sign-up"
                            className="shrink-0 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-violet-500 active:scale-95"
                        >
                            Join free →
                        </Link>
                    </div>
                </div>

                {/* Main CTA */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 dark:bg-zinc-900/80 dark:ring-white/[0.07]">
                    <div className="relative px-8 py-14 sm:px-12 sm:py-20">
                        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-800/20" />
                        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-800/20" />

                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                                Your next adventure awaits
                            </p>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Ready to take off?{" "}
                                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400">
                                    Find the best fare
                                </span>
                            </h2>

                            <p className="mx-auto mt-4 max-w-lg text-base text-gray-500 dark:text-zinc-400">
                                Compare hundreds of airlines in seconds. Lock in
                                the lowest price before it's gone.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-500/25 transition-all hover:bg-violet-500 active:scale-95"
                                >
                                    Search flights now
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                                >
                                    Create free account
                                </Link>
                            </div>

                            <p className="mt-5 text-sm text-gray-400 dark:text-zinc-600">
                                No booking fees · Free cancellation · Secure
                                payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
