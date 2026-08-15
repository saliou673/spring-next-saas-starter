import { ActivityIndicator, StyleSheet, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { useGetCurrentUserPreferences, useUpdateCurrentUserPreferences } from '@api-client';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { showToast } from '@/components/toast/toast-store';
import { Spacing } from '@/constants/theme';

// There's no `notifications` field on UserPreferences beyond
// `productUpdatesEnabled` - security-relevant emails are always sent and
// aren't a user preference, and no other notification type exists in this
// app to make a preference meaningful for.
export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { data: preferences, isLoading, isError } = useGetCurrentUserPreferences();

  const { mutate: updatePreferences, isPending } = useUpdateCurrentUserPreferences({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  function onToggle(productUpdatesEnabled: boolean) {
    if (!preferences) return;

    updatePreferences(
      { data: { appearance: preferences.appearance, notifications: { productUpdatesEnabled } } },
      {
        onError: () => showToast(t('settings.notifications.saveError'), 'error'),
      }
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.notifications') }} />
      <SettingsListScreen>
        {isLoading ? (
          <ActivityIndicator />
        ) : isError || !preferences ? (
          <ThemedText themeColor="danger">{t('settings.notifications.loadError')}</ThemedText>
        ) : (
          <ThemedView type="backgroundElement" style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <ThemedText>{t('settings.notifications.productUpdatesLabel')}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {t('settings.notifications.productUpdatesDescription')}
                </ThemedText>
              </View>
              <Switch
                value={preferences.notifications.productUpdatesEnabled}
                disabled={isPending}
                onValueChange={onToggle}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <ThemedText>{t('settings.notifications.securityLabel')}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {t('settings.notifications.securityDescription')}
                </ThemedText>
              </View>
              <Switch value disabled />
            </View>
          </ThemedView>
        )}
      </SettingsListScreen>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.four,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  switchLabel: {
    flex: 1,
    gap: Spacing.half,
  },
});
