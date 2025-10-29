import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import styled from 'styled-components/native';

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
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="[...messing]" options={{ headerShown: false }} />
          </Stack>        
      </GestureHandlerRootView>
    </SafeAreaProvider>      
  );
}
