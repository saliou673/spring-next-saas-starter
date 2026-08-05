import {
    LayoutDashboard,
    Monitor,
    HelpCircle,
    Bell,
    Palette,
    Settings,
    Wrench,
    UserCog,
    Users,
    ShieldCheck,
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
    SlidersHorizontal,
    HardDrive,
    Percent,
    Building2,
    Tag,
    ShieldAlert,
} from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
    teams: [
        {
            name: "Shadcn Admin",
            logo: Command,
            plan: "Vite + ShadcnUI",
        },
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
    ],
    navGroups: [
        {
            title: "General",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: LayoutDashboard,
                },
                {
                    title: "Users",
                    url: "/users",
                    icon: Users,
                    requiredPermission: "user:read",
                },
                {
                    title: "Role Groups",
                    url: "/role-groups",
                    icon: ShieldCheck,
                    requiredPermission: "role-group:read",
                },
                {
                    title: "Configuration",
                    icon: SlidersHorizontal,
                    requiredPermission: "config:manage",
                    items: [
                        {
                            title: "Reference Data",
                            url: "/configurations",
                            icon: Tag,
                        },
                        {
                            title: "File Storage",
                            url: "/configurations/storage-settings",
                            icon: HardDrive,
                        },
                        {
                            title: "Tax Rates",
                            url: "/configurations/tax-configurations",
                            icon: Percent,
                        },
                        {
                            title: "Company Profile",
                            url: "/configurations/enterprise-profile",
                            icon: Building2,
                        },
                        {
                            title: "Security",
                            url: "/configurations/security-settings",
                            icon: ShieldAlert,
                        },
                    ],
                },
            ],
        },
        {
            title: "Other",
            items: [
                {
                    title: "Settings",
                    icon: Settings,
                    items: [
                        {
                            title: "Profile",
                            url: "/settings",
                            icon: UserCog,
                        },
                        {
                            title: "Account",
                            url: "/settings/account",
                            icon: Wrench,
                        },
                        {
                            title: "Appearance",
                            url: "/settings/appearance",
                            icon: Palette,
                        },
                        {
                            title: "Notifications",
                            url: "/settings/notifications",
                            icon: Bell,
                        },
                        {
                            title: "Display",
                            url: "/settings/display",
                            icon: Monitor,
                        },
                    ],
                },
                {
                    title: "Help Center",
                    url: "/help-center",
                    icon: HelpCircle,
                },
            ],
        },
    ],
};
