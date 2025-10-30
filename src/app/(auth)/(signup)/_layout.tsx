import { Stack } from 'expo-router';

export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="emailVerify" options={{ headerShown: false }} />
      <Stack.Screen name="checkUsername" options={{ headerShown: false }} />
      <Stack.Screen name="setPassword" options={{ headerShown: false }} />
    </Stack>  
  );
}
