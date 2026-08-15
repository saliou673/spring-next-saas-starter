import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NotifyType = 'all' | 'mentions' | 'none';

// No `notifications` field exists on UserPreferences yet - saasapp-web's own
// notifications-form.tsx is the same: local component state only, submitted
// to a `showSubmittedData` stub rather than a real endpoint. This mirrors
// that (still-fake) behavior rather than inventing persistence the backend
// doesn't have.
export default function NotificationsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [notifyType, setNotifyType] = useState<NotifyType>('all');
  const [communicationEmails, setCommunicationEmails] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [socialEmails, setSocialEmails] = useState(true);

  const typeOptions: { value: NotifyType; label: string }[] = [
    { value: 'all', label: t('settings.notifications.typeAll') },
    { value: 'mentions', label: t('settings.notifications.typeMentions') },
    { value: 'none', label: t('settings.notifications.typeNone') },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.notifications') }} />
      <SettingsListScreen>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.field}>
            <ThemedText type="smallBold">{t('settings.notifications.notifyLabel')}</ThemedText>
            {typeOptions.map((option) => (
              <Pressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityState={{ selected: option.value === notifyType }}
                onPress={() => setNotifyType(option.value)}
                style={styles.radioRow}>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: theme.text },
                    option.value === notifyType && { borderColor: theme.text },
                  ]}>
                  {option.value === notifyType && (
                    <View style={[styles.radioInner, { backgroundColor: theme.text }]} />
                  )}
                </View>
                <ThemedText>{option.label}</ThemedText>
              </Pressable>
            ))}
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <ThemedText>{t('settings.notifications.communicationLabel')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('settings.notifications.communicationDescription')}
              </ThemedText>
            </View>
            <Switch value={communicationEmails} onValueChange={setCommunicationEmails} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <ThemedText>{t('settings.notifications.marketingLabel')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('settings.notifications.marketingDescription')}
              </ThemedText>
            </View>
            <Switch value={marketingEmails} onValueChange={setMarketingEmails} />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <ThemedText>{t('settings.notifications.socialLabel')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('settings.notifications.socialDescription')}
              </ThemedText>
            </View>
            <Switch value={socialEmails} onValueChange={setSocialEmails} />
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
  field: {
    gap: Spacing.two,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
