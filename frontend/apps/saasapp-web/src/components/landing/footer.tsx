import { PlaneTakeoff, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
    Flights: [
        { label: "Cheap flights", href: "#" },
        { label: "Business class", href: "#" },
        { label: "First class", href: "#" },
        { label: "Flight deals", href: "#features" },
    ],
    Destinations: [
        { label: "Europe", href: "#" },
        { label: "Asia", href: "#" },
        { label: "Americas", href: "#" },
        { label: "Africa", href: "#" },
    ],
    Support: [
        { label: "Help center", href: "/help-center" },
        { label: "Manage booking", href: "#" },
        { label: "Contact us", href: "/contact" },
        { label: "Travel alerts", href: "#" },
    ],
    Company: [
        { label: "About us", href: "#" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookie policy", href: "/cookie-policy" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-white dark:bg-black">
            <div className="border-t border-gray-200 dark:border-white/[0.07]" />

            <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
                    {/* Brand column */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                                <PlaneTakeoff className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                                SkyBook
                            </span>
                        </Link>
                        <p className="mb-5 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-zinc-500">
                            The smarter way to search, compare, and book
                            flights at the best prices.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 transition-colors hover:text-violet-600 dark:text-zinc-600 dark:hover:text-violet-400"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 transition-colors hover:text-violet-600 dark:text-zinc-600 dark:hover:text-violet-400"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 transition-colors hover:text-violet-600 dark:text-zinc-600 dark:hover:text-violet-400"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="mb-4 text-[11px] font-bold tracking-widest text-gray-500 uppercase dark:text-zinc-500">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 transition-colors hover:text-violet-600 dark:text-zinc-500 dark:hover:text-violet-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-8 sm:flex-row dark:border-white/[0.05]">
                    <p className="text-sm text-gray-400 dark:text-zinc-600">
                        © {new Date().getFullYear()} SkyBook. All rights
                        reserved.
                    </p>
                    <p className="text-xs text-gray-300 dark:text-zinc-700">
                        ✈ Fly smarter, pay less, travel more
                    </p>
                </div>
            </div>
        </footer>
    );
}
