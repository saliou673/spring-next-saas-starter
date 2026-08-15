import { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { twoFactorSetupRequestTypeEnum, useConfirm2FactorSetup, useInit2FactorSetup } from '@api-client';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { FormTextField } from '@/components/form-text-field';
import { SubmitButton } from '@/components/submit-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { showToast } from '@/components/toast/toast-store';
import { Spacing } from '@/constants/theme';

// The generated client types this response as a bare `object` since its
// shape depends on the setup `type` (see TwoFactorController#init2FactorSetup);
// TOTP always returns these two fields.
type TotpSetupResponse = { secret: string; otpAuthUri: string };

// The backend has no field exposing 2FA-enabled status on GET /accounts/me,
// so this is a best-effort local flag rather than a source of truth - it can
// drift if 2FA is toggled from another device. See #28 for the disable flow
// that also maintains it.
export const TWO_FACTOR_ENABLED_STORAGE_KEY = 'saasapp-mobile-2fa-enabled';

const CODE_LENGTH = 6;

export default function TwoFactorScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);
  const [setup, setSetup] = useState<TotpSetupResponse | null>(null);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    void AsyncStorage.getItem(TWO_FACTOR_ENABLED_STORAGE_KEY).then((stored) => {
      setIsEnabled(stored === 'true');
    });
  }, []);

  const { mutateAsync: initSetup, isPending: isInitiating } = useInit2FactorSetup({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });
  const { mutateAsync: confirmSetup, isPending: isConfirming } = useConfirm2FactorSetup({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  async function onStartSetup() {
    setFormError(null);

    try {
      const response = await initSetup({ data: { type: twoFactorSetupRequestTypeEnum.TOTP } });
      setSetup(response as TotpSetupResponse);
    } catch {
      setFormError(t('settings.account.twoFactorSetup.startError'));
    }
  }

  async function onOpenAuthenticator() {
    if (!setup) return;

    try {
      await Linking.openURL(setup.otpAuthUri);
    } catch {
      // No app registered for the otpauth:// scheme on this device - the
      // secret below is the fallback for manual entry.
    }
  }

  async function onConfirmSubmit() {
    setCodeError(undefined);
    setFormError(null);

    const trimmed = code.trim();
    if (!trimmed) {
      setCodeError(t('settings.account.twoFactorSetup.codeRequired'));
      return;
    }

    try {
      await confirmSetup({ data: { code: trimmed } });
      await AsyncStorage.setItem(TWO_FACTOR_ENABLED_STORAGE_KEY, 'true');
      showToast(t('settings.account.twoFactorSetup.toastEnabled'), 'success');
      router.back();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data as { message?: string } | undefined;
        setCodeError(data?.message ?? t('settings.account.twoFactorSetup.invalidCode'));
        return;
      }
      setFormError(t('errors.generic'));
    }
  }

  if (isEnabled === null) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: t('settings.account.twoFactor') }} />
      <SettingsListScreen
        description={
          isEnabled
            ? t('settings.account.twoFactorSetup.enabledDescription')
            : t('settings.account.twoFactorSetup.description')
        }>
        {isEnabled ? (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText>{t('settings.account.twoFactorSetup.alreadyEnabled')}</ThemedText>
          </ThemedView>
        ) : !setup ? (
          <ThemedView type="backgroundElement" style={styles.card}>
            {formError && (
              <ThemedText type="small" themeColor="danger">
                {formError}
              </ThemedText>
            )}
            <SubmitButton
              label={t('settings.account.twoFactorSetup.startButton')}
              onPress={() => void onStartSetup()}
              isPending={isInitiating}
            />
          </ThemedView>
        ) : (
          <ThemedView type="backgroundElement" style={styles.card}>
            <Pressable accessibilityRole="button" onPress={() => void onOpenAuthenticator()}>
              <ThemedText type="linkPrimary">
                {t('settings.account.twoFactorSetup.openAuthenticator')}
              </ThemedText>
            </Pressable>

            <View style={styles.secretBlock}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('settings.account.twoFactorSetup.manualEntryHint')}
              </ThemedText>
              <ThemedText type="code" style={styles.secret} selectable>
                {setup.secret}
              </ThemedText>
            </View>

            <FormTextField
              label={t('settings.account.twoFactorSetup.codeLabel')}
              value={code}
              onChangeText={setCode}
              placeholder="123456"
              error={codeError}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              editable={!isConfirming}
              onSubmitEditing={() => void onConfirmSubmit()}
            />

            {formError && (
              <ThemedText type="small" themeColor="danger">
                {formError}
              </ThemedText>
            )}

            <SubmitButton
              label={t('settings.account.twoFactorSetup.confirmButton')}
              onPress={() => void onConfirmSubmit()}
              isPending={isConfirming}
            />
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
    gap: Spacing.three,
  },
  secretBlock: {
    gap: Spacing.one,
  },
  secret: {
    fontSize: 18,
    letterSpacing: 2,
  },
});
