import { ActivityIndicator, Pressable, StyleSheet, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import {
  displayPreferencesTextSizeEnum,
  useGetCurrentUserPreferences,
  useUpdateCurrentUserPreferences,
  type DisplayPreferencesTextSizeEnumKey,
} from '@api-client';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { showToast } from '@/components/toast/toast-store';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Web's display-form.tsx used to be about which items show in a desktop
// sidebar (recents/home/applications/desktop/...), which has no mobile
// equivalent - there's no sidebar. Both platforms now share this schema
// instead: text size and reduced motion, meaningful everywhere.
export default function DisplayScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: preferences, isLoading, isError } = useGetCurrentUserPreferences();

  const { mutate: updatePreferences, isPending } = useUpdateCurrentUserPreferences({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  function onSaveError() {
    showToast(t('settings.display.saveError'), 'error');
  }

  function onTextSizeChange(textSize: DisplayPreferencesTextSizeEnumKey) {
    if (!preferences) return;

    updatePreferences(
      {
        data: {
          appearance: preferences.appearance,
          notifications: preferences.notifications,
          display: { ...preferences.display, textSize },
        },
      },
      { onError: onSaveError }
    );
  }

  function onReduceMotionChange(reduceMotion: boolean) {
    if (!preferences) return;

    updatePreferences(
      {
        data: {
          appearance: preferences.appearance,
          notifications: preferences.notifications,
          display: { ...preferences.display, reduceMotion },
        },
      },
      { onError: onSaveError }
    );
  }

  const textSizeOptions: { value: DisplayPreferencesTextSizeEnumKey; label: string }[] = [
    { value: displayPreferencesTextSizeEnum.SMALL, label: t('settings.display.textSizeSmall') },
    {
      value: displayPreferencesTextSizeEnum.DEFAULT,
      label: t('settings.display.textSizeDefault'),
    },
    { value: displayPreferencesTextSizeEnum.LARGE, label: t('settings.display.textSizeLarge') },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.display') }} />
      <SettingsListScreen>
        {isLoading ? (
          <ActivityIndicator />
        ) : isError || !preferences ? (
          <ThemedText themeColor="danger">{t('settings.display.loadError')}</ThemedText>
        ) : (
          <ThemedView type="backgroundElement" style={styles.card}>
            <View style={styles.field}>
              <ThemedText type="smallBold">{t('settings.display.textSizeLabel')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('settings.display.textSizeDescription')}
              </ThemedText>
              <View style={styles.optionRow}>
                {textSizeOptions.map((option) => {
                  const selected = option.value === preferences.display.textSize;
                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="button"
                      disabled={isPending}
                      onPress={() => onTextSizeChange(option.value)}
                      style={[
                        styles.option,
                        {
                          backgroundColor: selected ? theme.text : theme.backgroundSelected,
                          borderColor: theme.backgroundSelected,
                        },
                      ]}>
                      <ThemedText
                        type="small"
                        style={{ color: selected ? theme.background : theme.text }}>
                        {option.label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <ThemedText>{t('settings.display.reduceMotionLabel')}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {t('settings.display.reduceMotionDescription')}
                </ThemedText>
              </View>
              <Switch
                value={preferences.display.reduceMotion}
                disabled={isPending}
                onValueChange={onReduceMotionChange}
              />
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
  field: {
    gap: Spacing.two,
  },
  optionRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
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
