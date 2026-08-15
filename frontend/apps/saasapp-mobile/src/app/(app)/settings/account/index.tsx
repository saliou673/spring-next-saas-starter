import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { SettingsRow } from '@/components/settings-row';

export default function SettingsAccountScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('settings.account.title') }} />
      <SettingsListScreen description={t('settings.account.description')}>
        <SettingsRow href="/settings/account/email" title={t('settings.account.email')} />
        <SettingsRow href="/settings/account/password" title={t('settings.account.password')} />
        <SettingsRow href="/settings/account/two-factor" title={t('settings.account.twoFactor')} />
        <SettingsRow
          href="/settings/account/delete"
          title={t('settings.account.delete')}
          destructive
        />
      </SettingsListScreen>
    </>
  );
}
