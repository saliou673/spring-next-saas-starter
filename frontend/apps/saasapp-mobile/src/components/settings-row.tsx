import { Pressable, StyleSheet, View } from 'react-native';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type SettingsRowProps = {
  // Typed as `string` rather than `Href`: rows in this stacked epic are wired
  // up ahead of the screen they point to being built by a later issue, so
  // Expo Router's generated route union doesn't include the target yet.
  href: string;
  title: string;
  subtitle?: string;
  destructive?: boolean;
};

export function SettingsRow({ href, title, subtitle, destructive = false }: SettingsRowProps) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(href as Href)}
      style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView type="backgroundElement" style={styles.row}>
        <View style={styles.textColumn}>
          <ThemedText themeColor={destructive ? 'danger' : 'text'}>{title}</ThemedText>
          {subtitle && (
            <ThemedText type="small" themeColor="textSecondary">
              {subtitle}
            </ThemedText>
          )}
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          ›
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  textColumn: {
    flex: 1,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
});
