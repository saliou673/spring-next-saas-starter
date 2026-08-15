import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import {
  appearancePreferencesFontEnum,
  appearancePreferencesThemeEnum,
  useGetCurrentUserPreferences,
  useUpdateCurrentUserPreferences,
  type AppearancePreferencesThemeEnumKey,
} from '@api-client';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppTheme, type Theme } from '@/context/theme-provider';

const THEME_TO_API: Record<Theme, AppearancePreferencesThemeEnumKey> = {
  light: appearancePreferencesThemeEnum.LIGHT,
  dark: appearancePreferencesThemeEnum.DARK,
  system: appearancePreferencesThemeEnum.SYSTEM,
};

const API_TO_THEME: Record<AppearancePreferencesThemeEnumKey, Theme> = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export default function AppearanceScreen() {
  const { t } = useTranslation();
  const uiColors = useTheme();
  const { theme, setTheme } = useAppTheme();

  const { data: preferences } = useGetCurrentUserPreferences();
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useUpdateCurrentUserPreferences({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  // Keep the local theme in sync with the account's stored preference, e.g.
  // after a reinstall or on a second device.
  useEffect(() => {
    if (!preferences) return;
    const stored = API_TO_THEME[preferences.appearance.theme];
    if (stored !== theme) {
      setTheme(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  async function onSelect(next: Theme) {
    setFormError(null);
    setTheme(next);

    try {
      await mutateAsync({
        data: {
          appearance: {
            theme: THEME_TO_API[next],
            font: preferences?.appearance.font ?? appearancePreferencesFontEnum.SYSTEM,
          },
          // This mutation replaces the whole preferences document, so the
          // notifications half has to be carried through unchanged here.
          notifications: preferences?.notifications ?? { productUpdatesEnabled: false },
        },
      });
    } catch {
      setFormError(t('settings.appearance.saveError'));
    }
  }

  const options: { value: Theme; label: string }[] = [
    { value: 'system', label: t('settings.appearance.system') },
    { value: 'light', label: t('settings.appearance.light') },
    { value: 'dark', label: t('settings.appearance.dark') },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.appearance') }} />
      <SettingsListScreen description={t('settings.appearance.description')}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.optionRow}>
            {options.map((option) => {
              const selected = option.value === theme;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  disabled={isPending}
                  onPress={() => void onSelect(option.value)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected ? uiColors.text : uiColors.backgroundSelected,
                      borderColor: uiColors.backgroundSelected,
                    },
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={{ color: selected ? uiColors.background : uiColors.text }}>
                    {option.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          {formError && (
            <ThemedText type="small" themeColor="danger">
              {formError}
            </ThemedText>
          )}
        </ThemedView>
      </SettingsListScreen>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
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
    paddingVertical: Spacing.three,
  },
});
