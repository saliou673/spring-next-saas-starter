import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { SettingsRow } from '@/components/settings-row';

export default function SettingsHomeScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.title') }} />
      <SettingsListScreen description={t('settings.nav.description')}>
        <SettingsRow href="/settings/profile" title={t('settings.nav.profile')} />
        <SettingsRow href="/settings/account" title={t('settings.nav.account')} />
        <SettingsRow href="/settings/appearance" title={t('settings.nav.appearance')} />
        <SettingsRow href="/settings/notifications" title={t('settings.nav.notifications')} />
        <SettingsRow href="/settings/display" title={t('settings.nav.display')} />
        <SettingsRow href="/settings/language" title={t('settings.nav.language')} />
      </SettingsListScreen>
    </>
  );
}
