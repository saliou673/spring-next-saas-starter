import { AxiosError } from "axios";
import i18n from "@/i18n";
import { showToast } from "@/components/toast/toast-store";

/**
 * Issue #5's interceptor already retries once on 401 and force-logs-out on
 * refresh failure; a 401 reaching here means that has already happened, so
 * this only needs to surface a message, not repeat the auth flow.
 */
export function handleQueryError(error: unknown): void {
    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(error);
    }

    if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 401) {
            showToast(i18n.t("errors.sessionExpired"), "error");
            return;
        }

        if (status !== undefined && status >= 500) {
            showToast(i18n.t("errors.serverError"), "error");
            return;
        }

        const title = error.response?.data?.title as string | undefined;
        showToast(title ?? i18n.t("errors.generic"), "error");
        return;
    }

    showToast(i18n.t("errors.generic"), "error");
}
