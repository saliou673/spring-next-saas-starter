import type { ConfigContext, ExpoConfig } from "expo/config";

export type AppEnv = "development" | "staging" | "production";

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
        name: "saasapp-mobile",
        slug: "saasapp-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "saasappmobile",
        userInterfaceStyle: "automatic",
        ios: {
            icon: "./assets/expo.icon",
        },
        android: {
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png",
            },
            predictiveBackGestureEnabled: false,
            package: "com.anonymous.saasappmobile",
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    backgroundColor: "#208AEF",
                    android: {
                        image: "./assets/images/splash-icon.png",
                        imageWidth: 76,
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
