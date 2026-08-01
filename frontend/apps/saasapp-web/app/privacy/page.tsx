import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { LandingNavbar } from "@/components/landing/navbar";
import { Privacy } from "@/features/privacy";

export const metadata: Metadata = {
    title: "Privacy Policy — Saasapp",
    description: "Learn how Saasapp collects, uses, and protects your data.",
};

export default function PrivacyPage() {
    return (
        <>
            <LandingNavbar />
            <main className="pt-16">
                <Privacy />
            </main>
            <Footer />
        </>
    );
}
