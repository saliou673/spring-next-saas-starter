import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useActivateAccount } from '@api-client';

import { AuthScreen } from '@/components/auth-screen';

/**
 * Landing route for the activation link emailed after sign-up, reached as
 * `saasappmobile://activate?code=...`. It has no UI of its own beyond a
 * spinner: it fires the activation call and hands the outcome to sign-in as a
 * notice.
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
      router.replace({ pathname: '/sign-in', params: { notice: 'activationFailed' } });
      return;
    }

    if (isSuccess) {
      router.replace({ pathname: '/sign-in', params: { notice: 'accountActivated' } });
    }
  }, [code, isError, isSuccess, router]);

  return (
    <AuthScreen title={t('auth.activate.title')} subtitle={t('auth.activate.subtitle')}>
      <ActivityIndicator />
    </AuthScreen>
  );
}
