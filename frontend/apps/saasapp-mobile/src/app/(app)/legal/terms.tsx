import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';

import { SettingsListScreen } from '@/components/settings-list-screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type LegalSection = {
  heading: string;
  body: string;
  list?: string[];
};

const CONTACT_EMAIL = 'legal@saasapp.com';

export default function TermsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const sections = t('legal.terms.sections', { returnObjects: true }) as LegalSection[];

  return (
    <>
      <Stack.Screen options={{ title: t('legal.terms.title') }} />
      <SettingsListScreen description={t('legal.terms.lastUpdated')}>
        <View style={styles.sections}>
          {sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <ThemedText type="smallBold" style={styles.heading}>
                {section.heading}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {section.body}
              </ThemedText>
              {section.list && (
                <View style={styles.list}>
                  {section.list.map((item) => (
                    <View key={item} style={styles.listItem}>
                      <ThemedText type="small" themeColor="textSecondary">
                        {'•'}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary" style={styles.listItemText}>
                        {item}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          <Pressable
            accessibilityRole="link"
            onPress={() => void Linking.openURL(`mailto:${CONTACT_EMAIL}`)}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary" style={{ color: theme.text }}>
              {CONTACT_EMAIL}
            </ThemedText>
          </Pressable>
        </View>
      </SettingsListScreen>
    </>
  );
}

const styles = StyleSheet.create({
  sections: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  heading: {
    fontSize: 18,
  },
  list: {
    gap: Spacing.one,
  },
  listItem: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  listItemText: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
