import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';

export default function SignInScreen() {
  const { signIn } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Sign in
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
          The sign-in flow isn&apos;t built yet. This placeholder just proves the
          authenticated/unauthenticated navigation shell works.
        </ThemedText>

        {__DEV__ && (
          <Pressable
            style={({ pressed }) => [styles.devButton, pressed && styles.pressed]}
            onPress={() =>
              void signIn({ accessToken: 'dev-access-token', refreshToken: 'dev-refresh-token' })
            }>
            <ThemedText type="link">Dev: sign in with dummy tokens</ThemedText>
          </Pressable>
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
  },
  devButton: {
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.7,
  },
});
