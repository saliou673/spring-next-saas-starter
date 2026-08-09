import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useActivateAccount } from '@api-client';

import { AuthScreen } from '@/components/auth-screen';
import { showToast } from '@/components/toast/toast-store';

/**
 * Landing route for the activation link emailed after sign-up, reached as
 * `saasappmobile://activate?code=...`. It has no UI of its own beyond a
 * spinner: it fires the activation call, then sends the user to sign-in with
 * the outcome as a toast.
 */
export default function ActivateScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code?: string }>();

  const { isSuccess, isError } = useActivateAccount(
    { code: code ?? '' },
    undefined,
    {
      query: {
        enabled: Boolean(code),
        retry: false,
        meta: { skipGlobalErrorToast: true },
      },
    }
  );

  useEffect(() => {
    if (!code || isError) {
      showToast(t('auth.toasts.activationFailed'), 'error');
      router.replace('/sign-in');
      return;
    }

    if (isSuccess) {
      showToast(t('auth.toasts.accountActivated'), 'success');
      router.replace('/sign-in');
    }
  }, [code, isError, isSuccess, router, t]);

  return (
    <AuthScreen title={t('auth.activate.title')} subtitle={t('auth.activate.subtitle')}>
      <ActivityIndicator />
    </AuthScreen>
  );
}
