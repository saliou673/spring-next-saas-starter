import {
    Search,
    CreditCard,
    Ticket,
    BadgeCheck,
    Clock,
    HeadphonesIcon,
    ShieldCheck,
    Wallet,
} from "lucide-react";

const HOW_IT_WORKS = [
    {
        step: 1,
        icon: Search,
        title: "Search your flight",
        description:
            "Enter your destination, travel dates, and number of passengers. We'll search hundreds of airlines instantly.",
        accent: "bg-violet-600",
        iconBg: "bg-violet-50 dark:bg-violet-500/10",
        iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
        step: 2,
        icon: CreditCard,
        title: "Choose & pay securely",
        description:
            "Compare prices, filter by stops and airline, then book with confidence using our encrypted secure payment.",
        accent: "bg-indigo-600",
        iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
        iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
        step: 3,
        icon: Ticket,
        title: "Get your e-ticket",
        description:
            "Receive your confirmed e-ticket instantly by email. Show it on your phone — no printing needed.",
        accent: "bg-fuchsia-600",
        iconBg: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
        iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    },
];

const WHY_US = [
    {
        icon: BadgeCheck,
        title: "Best price guarantee",
        description:
            "Found it cheaper elsewhere? We'll match the price and give you a $25 travel credit.",
        iconBg: "bg-violet-50 dark:bg-violet-500/10",
        iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
        icon: Clock,
        title: "Free 24h cancellation",
        description:
            "Change your mind? Cancel any booking within 24 hours of purchase for a full refund, no questions asked.",
        iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        icon: HeadphonesIcon,
        title: "24/7 customer support",
        description:
            "Our travel experts are available around the clock by chat, phone, or email to help you.",
        iconBg: "bg-blue-50 dark:bg-blue-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: ShieldCheck,
        title: "Secure & trusted",
        description:
            "Your payment is protected by 256-bit SSL encryption. Over 10 million travelers book with us every year.",
        iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
        iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
        icon: Wallet,
        title: "No hidden fees",
        description:
            "The price you see is the price you pay. All taxes and fees are included upfront — no surprises at checkout.",
        iconBg: "bg-amber-50 dark:bg-amber-500/10",
        iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
        icon: BadgeCheck,
        title: "Earn travel rewards",
        description:
            "Collect points on every booking and redeem them for free flights, upgrades, and exclusive perks.",
        iconBg: "bg-rose-50 dark:bg-rose-500/10",
        iconColor: "text-rose-600 dark:text-rose-400",
    },
];

export function Process() {
    return (
        <>
            {/* How it works */}
            <section
                id="process"
                className="bg-slate-50 py-20 sm:py-28 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-14 text-center">
                        <p className="mb-2 text-sm font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                            Simple as 1-2-3
                        </p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            How it works
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-zinc-400">
                            Book your flight in under 5 minutes. No account
                            required — just search, pick, and fly.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {HOW_IT_WORKS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.step}
                                    className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900/60 dark:ring-white/[0.07]"
                                >
                                    <div
                                        className={`absolute inset-y-0 left-0 w-1 ${item.accent}`}
                                    />
                                    <div className="p-6 pl-7">
                                        <div className="mb-5 flex items-start justify-between">
                                            <div
                                                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
                                            >
                                                <Icon
                                                    className={`h-5 w-5 ${item.iconColor}`}
                                                />
                                            </div>
                                            <span
                                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold text-white ${item.accent}`}
                                            >
                                                {item.step}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why choose us */}
            <section className="bg-white py-20 sm:py-28 dark:bg-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                            Why travelers choose us
                        </p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Travel smarter, pay less
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {WHY_US.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="flex gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-gray-200 dark:bg-zinc-900/40 dark:ring-white/[0.06]"
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${item.iconColor}`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
