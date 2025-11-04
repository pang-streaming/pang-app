import { Stack, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{
          animation: "fade"
        }}
    >
          <Stack.Screen 
          name="modal-example" 
          options={{ 
            presentation: 'card',
            headerShown: false,
            gestureEnabled: false,
            fullScreenGestureEnabled: false,
            animation: "none",
            
          }} 
        />
      <Tabs.Screen
        name="index"
        options={{
          headerShown:false,
          title: '홈',
          tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '검색',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '즐겨찾기',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
