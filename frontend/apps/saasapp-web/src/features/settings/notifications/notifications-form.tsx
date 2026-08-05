import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

function createNotificationsFormSchema(t: ReturnType<typeof useTranslations>) {
    return z.object({
        type: z.enum(["all", "mentions", "none"], {
            error: (iss) =>
                iss.input === undefined ? t("typeRequired") : undefined,
        }),
        mobile: z.boolean().default(false).optional(),
        communication_emails: z.boolean().default(false).optional(),
        social_emails: z.boolean().default(false).optional(),
        marketing_emails: z.boolean().default(false).optional(),
        security_emails: z.boolean(),
    });
}

type NotificationsFormValues = z.infer<
    ReturnType<typeof createNotificationsFormSchema>
>;

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
};

export function NotificationsForm() {
    const t = useTranslations("SettingsNotifications.form");
    const tValidation = useTranslations(
        "SettingsNotifications.form.validation"
    );
    const notificationsFormSchema = useMemo(
        () => createNotificationsFormSchema(tValidation),
        [tValidation]
    );
    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="relative space-y-3">
                            <FormLabel>{t("notifyLabel")}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col gap-2"
                                >
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("typeAll")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("typeMentions")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value="none" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("typeNone")}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="relative">
                    <h3 className="mb-4 text-lg font-medium">
                        {t("emailNotificationsTitle")}
                    </h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="communication_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {t("communicationLabel")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("communicationDescription")}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketing_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {t("marketingLabel")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("marketingDescription")}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="social_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {t("socialLabel")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("socialDescription")}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="security_emails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {t("securityLabel")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("securityDescription")}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled
                                            aria-readonly
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem className="relative flex flex-row items-start">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>{t("mobileLabel")}</FormLabel>
                                <FormDescription>
                                    {t.rich("mobileDescription", {
                                        link: (chunks) => (
                                            <Link
                                                href="/settings"
                                                className="underline decoration-dashed underline-offset-4 hover:decoration-solid"
                                            >
                                                {chunks}
                                            </Link>
                                        ),
                                    })}
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
