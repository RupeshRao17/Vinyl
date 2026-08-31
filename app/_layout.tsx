import React, { useCallback, useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts as useFraunces, Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { useFonts as useManrope, Manrope_400Regular } from '@expo-google-fonts/manrope';
import {
  useFonts as usePlexMono,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
} from '@expo-google-fonts/ibm-plex-mono';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Redirect based on auth state whenever it changes.
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/welcome');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)/diary');
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="album/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="list/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="search" options={{ animation: 'fade' }} />
      <Stack.Screen name="add-log" options={{ presentation: 'modal' }} />
      <Stack.Screen name="create-list" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [frauncesLoaded] = useFraunces({ Fraunces_600SemiBold, Fraunces_700Bold });
  const [manropeLoaded] = useManrope({ Manrope_400Regular });
  const [plexMonoLoaded] = usePlexMono({ IBMPlexMono_400Regular, IBMPlexMono_500Medium });

  const fontsLoaded = frauncesLoaded && manropeLoaded && plexMonoLoaded;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
