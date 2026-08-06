import { configureApiClient } from '@api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { apiBaseUrl } from '@/constants/env';
import { AppThemeProvider, useAppTheme } from '@/context/theme-provider';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import i18n, { hydrateStoredLanguage } from '@/i18n';
import { hydrateAccessToken, setupAuthInterceptor } from '@/lib/auth-interceptor';

configureApiClient({ baseURL: apiBaseUrl });
setupAuthInterceptor();

function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

function NavigationThemeSync({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useAppTheme();

  return (
    <NavigationThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    void hydrateAccessToken();
    void hydrateStoredLanguage();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppThemeProvider>
            <NavigationThemeSync>
              <AnimatedSplashOverlay />
              <RootNavigator />
            </NavigationThemeSync>
          </AppThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
