import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextSize = 'small' | 'default' | 'large';

// Web's display-form.tsx is about which items show in a desktop sidebar
// (recents/home/applications/desktop/...), which has no mobile equivalent -
// there's no sidebar. Adapted here to settings that are actually meaningful
// on a phone: text size and reduced motion.
//
// Like #31, there's no backend field for this (UserPreferences only has
// `appearance`), and web's own display screen is likewise local form state
// wired to a `showSubmittedData` stub rather than a real endpoint - so this
// mirrors that same local-only, non-persisted behavior.
export default function DisplayScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [textSize, setTextSize] = useState<TextSize>('default');
  const [reduceMotion, setReduceMotion] = useState(false);

  const textSizeOptions: { value: TextSize; label: string }[] = [
    { value: 'small', label: t('settings.display.textSizeSmall') },
    { value: 'default', label: t('settings.display.textSizeDefault') },
    { value: 'large', label: t('settings.display.textSizeLarge') },
  ];

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.display') }} />
      <SettingsListScreen>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.field}>
            <ThemedText type="smallBold">{t('settings.display.textSizeLabel')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('settings.display.textSizeDescription')}
            </ThemedText>
            <View style={styles.optionRow}>
              {textSizeOptions.map((option) => {
                const selected = option.value === textSize;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    onPress={() => setTextSize(option.value)}
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
            <Switch value={reduceMotion} onValueChange={setReduceMotion} />
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
