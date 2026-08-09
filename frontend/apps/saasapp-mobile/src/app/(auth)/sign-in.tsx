import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useAuthenticate } from '@api-client';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 7;

type FieldErrors = {
  email?: string;
  password?: string;
};

/**
 * `POST /api/auth/login` answers 200 with a JwtToken or 202 with a 2FA
 * challenge, but the controller returns `ResponseEntity<?>` so the generated
 * response type erases to `object`. Both shapes have to be narrowed by hand
 * until the endpoint declares its schemas.
 */
type LoginTokens = { accessToken: string; refreshToken: string };

function isTwoFactorChallenge(response: unknown): boolean {
  return typeof response === 'object' && response !== null && 'challengeId' in response;
}

function isLoginTokens(response: unknown): response is LoginTokens {
  if (typeof response !== 'object' || response === null) return false;
  const candidate = response as Partial<LoginTokens>;
  return typeof candidate.accessToken === 'string' && typeof candidate.refreshToken === 'string';
}

export default function SignInScreen() {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useAuthenticate({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (!email) {
      errors.email = t('auth.signIn.emailRequired');
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = t('auth.signIn.emailInvalid');
    }

    if (!password) {
      errors.password = t('auth.signIn.passwordRequired');
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = t('auth.signIn.passwordTooShort');
    }

    return errors;
  }

  function applyApiError(error: unknown) {
    if (!(error instanceof AxiosError)) {
      setFormError(t('errors.generic'));
      return;
    }

    const data = error.response?.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;

    if (data?.errors) {
      setFieldErrors({ email: data.errors.email, password: data.errors.password });
    }

    const hasFieldErrors = Boolean(data?.errors?.email || data?.errors?.password);
    if (hasFieldErrors) return;

    if (error.response?.status === 401) {
      setFormError(data?.message ?? t('auth.signIn.invalidCredentials'));
      return;
    }

    setFormError(data?.message ?? t('errors.generic'));
  }

  async function onSubmit() {
    const errors = validate();
    setFieldErrors(errors);
    setFormError(null);

    if (errors.email || errors.password) return;

    try {
      const response = await mutateAsync({ data: { email, password, rememberMe } });

      if (isTwoFactorChallenge(response)) {
        setFormError(t('auth.signIn.twoFactorNotSupported'));
        return;
      }

      if (!isLoginTokens(response)) {
        setFormError(t('errors.generic'));
        return;
      }

      await signIn({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      router.replace('/');
    } catch (error) {
      applyApiError(error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.form}>
              <ThemedText type="subtitle">{t('auth.signIn.title')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
                {t('auth.signIn.subtitle')}
              </ThemedText>

              <View style={styles.field}>
                <ThemedText type="smallBold">{t('auth.signIn.emailLabel')}</ThemedText>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('auth.signIn.emailPlaceholder')}
                  placeholderTextColor={theme.textSecondary}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!isPending}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.backgroundElement,
                      borderColor: fieldErrors.email ? theme.danger : theme.backgroundSelected,
                      color: theme.text,
                    },
                  ]}
                />
                {fieldErrors.email && (
                  <ThemedText type="small" themeColor="danger">
                    {fieldErrors.email}
                  </ThemedText>
                )}
              </View>

              <View style={styles.field}>
                <ThemedText type="smallBold">{t('auth.signIn.passwordLabel')}</ThemedText>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('auth.signIn.passwordPlaceholder')}
                  placeholderTextColor={theme.textSecondary}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect={false}
                  secureTextEntry
                  editable={!isPending}
                  onSubmitEditing={() => void onSubmit()}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.backgroundElement,
                      borderColor: fieldErrors.password ? theme.danger : theme.backgroundSelected,
                      color: theme.text,
                    },
                  ]}
                />
                {fieldErrors.password && (
                  <ThemedText type="small" themeColor="danger">
                    {fieldErrors.password}
                  </ThemedText>
                )}
              </View>

              <View style={styles.rememberMeRow}>
                <ThemedText type="small">{t('auth.signIn.rememberMe')}</ThemedText>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  disabled={isPending}
                  accessibilityLabel={t('auth.signIn.rememberMe')}
                />
              </View>

              {formError && (
                <ThemedText type="small" themeColor="danger">
                  {formError}
                </ThemedText>
              )}

              <Pressable
                accessibilityRole="button"
                disabled={isPending}
                onPress={() => void onSubmit()}
                style={({ pressed }) => [
                  styles.submit,
                  { backgroundColor: theme.text },
                  (pressed || isPending) && styles.submitPressed,
                ]}>
                {isPending ? (
                  <ActivityIndicator color={theme.background} />
                ) : (
                  <ThemedText type="smallBold" style={{ color: theme.background }}>
                    {t('auth.signIn.submit')}
                  </ThemedText>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  form: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  subtitle: {
    marginTop: -Spacing.two,
  },
  field: {
    gap: Spacing.one,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
  submit: {
    marginTop: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    minHeight: 48,
  },
  submitPressed: {
    opacity: 0.7,
  },
});
