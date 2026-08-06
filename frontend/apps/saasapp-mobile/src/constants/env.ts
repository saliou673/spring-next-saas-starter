import Constants from "expo-constants";
import type { AppEnv } from "../../app.config";

type AppExtra = {
    appEnv?: AppEnv;
    apiBaseUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;

export const appEnv: AppEnv = extra.appEnv ?? "development";
export const apiBaseUrl: string = extra.apiBaseUrl ?? "http://localhost:8080";
