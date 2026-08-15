import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { useGetUserDetails, useUpdateAccount } from '@api-client';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { showToast } from '@/components/toast/toast-store';
import { Spacing } from '@/constants/theme';
import { setLanguage, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n';

const LANGUAGE_LABEL_KEYS: Record<SupportedLanguage, string> = {
  en: 'languageSwitch.english',
  fr: 'languageSwitch.french',
};

export default function LanguageScreen() {
  const { t, i18n } = useTranslation();
  const { data: user } = useGetUserDetails();
  const [isSaving, setIsSaving] = useState(false);

  const { mutateAsync: updateAccount } = useUpdateAccount({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  const currentLanguage = i18n.language as SupportedLanguage;

  async function onSelect(next: SupportedLanguage) {
    if (next === currentLanguage || isSaving) return;

    setIsSaving(true);
    await setLanguage(next);

    if (user) {
      try {
        await updateAccount({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            gender: user.gender,
            address: user.address,
            languageKey: next,
            imageUrl: user.imageUrl,
          },
        });
      } catch {
        // The device-local language already switched via setLanguage above -
        // only the account-level sync failed, so this is reported without
        // reverting the language the user just picked.
        showToast(t('settings.language.syncError'), 'error');
      }
    }

    setIsSaving(false);
  }

  return (
    <>
      <Stack.Screen options={{ title: t('settings.nav.language') }} />
      <SettingsListScreen description={t('settings.language.description')}>
        <ThemedView type="backgroundElement" style={styles.card}>
          {SUPPORTED_LANGUAGES.map((language) => {
            const selected = language === currentLanguage;
            return (
              <Pressable
                key={language}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                disabled={isSaving}
                onPress={() => void onSelect(language)}
                style={styles.row}>
                <ThemedText>{t(LANGUAGE_LABEL_KEYS[language])}</ThemedText>
                {selected && <ThemedText>✓</ThemedText>}
              </Pressable>
            );
          })}
        </ThemedView>
      </SettingsListScreen>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
});
