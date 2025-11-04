import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, useColorScheme } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from '@/theme/theme';
import { useThemeStore } from '@/stores/useThemeStore';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'WantedSans-Regular': require('../../assets/fonts/WantedSans-Regular.otf'),
    'WantedSans-Medium': require('../../assets/fonts/WantedSans-Medium.otf'),
    'WantedSans-SemiBold': require('../../assets/fonts/WantedSans-SemiBold.otf'),
    'WantedSans-Bold': require('../../assets/fonts/WantedSans-Bold.otf'),
    'WantedSans-ExtraBold': require('../../assets/fonts/WantedSans-ExtraBold.otf'),
    'WantedSans-Black': require('../../assets/fonts/WantedSans-Black.otf'),
    'WantedSans-ExtraBlack': require('../../assets/fonts/WantedSans-ExtraBlack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemedAppWrapper />
      </GestureHandlerRootView>
    </SafeAreaProvider>      
  );
}

function ThemedAppWrapper() {
  const mode = useThemeStore((s) => s.mode);
  const colorScheme = useColorScheme();
  const effectiveMode = mode === 'system' ? (colorScheme ?? 'light') : mode;
  const theme = effectiveMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} translucent backgroundColor="transparent" />
      <Stack>
        <Stack.Screen 
          name="stream-viewer" 
          options={{ 
            presentation: 'card',
            headerShown: false,
            gestureEnabled: false,
            fullScreenGestureEnabled: false,
            animation: "none",
            
          }} 
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[...messing]" options={{ headerShown: false }} />

      </Stack>
    </ThemeProvider>
  );
}
