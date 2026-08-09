import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useLogout } from '@api-client';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

export function LogoutButton() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { mutateAsync } = useLogout({
    mutation: { meta: { skipGlobalErrorToast: true } },
  });

  async function onLogout() {
    setIsLoggingOut(true);

    try {
      // Revoke server-side first, while the access token is still attached.
      // A failure here (offline, already-expired token) must not strand the
      // user in a session they asked to end, so the local teardown runs either
      // way.
      await mutateAsync({});
    } catch {
      // Intentionally ignored - see above.
    }

    await signOut();
    queryClient.clear();
    router.replace('/sign-in');
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isLoggingOut}
      onPress={() => void onLogout()}
      style={({ pressed }) => [
        styles.button,
        { borderColor: theme.backgroundSelected },
        (pressed || isLoggingOut) && styles.pressed,
      ]}>
      {isLoggingOut ? (
        <ActivityIndicator color={theme.text} />
      ) : (
        <ThemedText type="smallBold">{t('auth.logout.action')}</ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    minHeight: 44,
  },
  pressed: {
    opacity: 0.7,
  },
});
