import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ProfileSummaryCard } from '@/components/profile-summary-card';
import { SettingsListScreen } from '@/components/settings-list-screen';
import { SettingsRow } from '@/components/settings-row';
import { SettingsSection } from '@/components/settings-section';

export default function SettingsHomeScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.title') }} />
      <SettingsListScreen description={t('settings.nav.description')}>
        <ProfileSummaryCard />

        <SettingsSection title={t('settings.nav.sectionAccount')}>
          <SettingsRow
            href="/settings/profile"
            title={t('settings.nav.profile')}
            icon={{ ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' }}
          />
          <SettingsRow
            href="/settings/account"
            title={t('settings.nav.account')}
            icon={{ ios: 'lock.shield', android: 'shield', web: 'shield' }}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.nav.sectionPreferences')}>
          <SettingsRow
            href="/settings/appearance"
            title={t('settings.nav.appearance')}
            icon={{ ios: 'paintpalette', android: 'palette', web: 'palette' }}
          />
          <SettingsRow
            href="/settings/notifications"
            title={t('settings.nav.notifications')}
            icon={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
          />
          <SettingsRow
            href="/settings/display"
            title={t('settings.nav.display')}
            icon={{ ios: 'textformat.size', android: 'format_size', web: 'format_size' }}
          />
          <SettingsRow
            href="/settings/language"
            title={t('settings.nav.language')}
            icon={{ ios: 'globe', android: 'language', web: 'language' }}
          />
        </SettingsSection>
      </SettingsListScreen>
    </>
  );
}
