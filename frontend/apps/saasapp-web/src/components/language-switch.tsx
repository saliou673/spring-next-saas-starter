"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { setLocale } from "@/i18n/actions";
import { locales, type Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitch() {
    const locale = useLocale();
    const t = useTranslations("LanguageSwitch");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const localeLabels: Record<Locale, string> = {
        en: t("english"),
        fr: t("french"),
    };

    const handleSetLocale = (nextLocale: Locale) => {
        startTransition(async () => {
            await setLocale(nextLocale);
            router.refresh();
        });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="scale-95 rounded-full"
                    disabled={isPending}
                >
                    <Languages className="size-[1.2rem]" />
                    <span className="sr-only">{t("toggleLabel")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((item) => (
                    <DropdownMenuItem
                        key={item}
                        onSelect={() => handleSetLocale(item)}
                    >
                        {localeLabels[item]}
                        <Check
                            size={14}
                            className={cn("ms-auto", locale !== item && "hidden")}
                        />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
