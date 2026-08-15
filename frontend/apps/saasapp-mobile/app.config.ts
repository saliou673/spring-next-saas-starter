import type { ConfigContext, ExpoConfig } from "expo/config";

export type AppEnv = "development" | "staging" | "production";

// Derived from saasapp-web's light-mode `--primary` theme token (oklch(0.208 0.042 265.755)).
const BRAND_COLOR = "#0f172b";

const DEFAULT_API_BASE_URLS: Record<AppEnv, string> = {
    development: "http://localhost:8080",
    staging: "https://staging-api.saasapp.dev",
    production: "https://api.saasapp.dev",
};

function resolveAppEnv(): AppEnv {
    const raw = process.env.APP_ENV ?? process.env.EAS_BUILD_PROFILE;

    if (raw === "production" || raw === "staging") {
        return raw;
    }

    return "development";
}

export default ({ config }: ConfigContext): ExpoConfig => {
    const appEnv = resolveAppEnv();
    const apiBaseUrl =
        process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URLS[appEnv];

    return {
        ...config,
        name: "Saasapp",
        slug: "saasapp-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "saasappmobile",
        userInterfaceStyle: "automatic",
        ios: {
            icon: "./assets/images/icon.png",
        },
        android: {
            adaptiveIcon: {
                backgroundColor: BRAND_COLOR,
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png",
            },
            predictiveBackGestureEnabled: false,
            package: "com.saasapp.mobile",
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            "expo-secure-store",
            "expo-localization",
            "expo-font",
            "expo-image",
            "expo-web-browser",
            [
                "expo-splash-screen",
                {
                    backgroundColor: BRAND_COLOR,
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 160,
                    android: {
                        image: "./assets/images/splash-icon.png",
                        imageWidth: 160,
                    },
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },
        extra: {
            ...config.extra,
            appEnv,
            apiBaseUrl,
        },
    };
};
