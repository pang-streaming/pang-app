import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import Menu from "@/assets/tab-icons/menu";
import Explore from "@/assets/tab-icons/explore";
import Heart from "@/assets/tab-icons/heart";
import Charge from "@/assets/tab-icons/charge";
export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        animation: "none",
        tabBarStyle: {
          paddingTop: 6,
          backgroundColor: theme.colors.background.normal,
          borderTopWidth: 1,
          borderColor: "#222324",
        },
        tabBarActiveTintColor: theme.colors.text.normal,
        tabBarInactiveTintColor: theme.colors.stroke.normal,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "홈",
          tabBarIcon: ({ color, size }) => <Explore color={color} />,
        }}
      />
      <Tabs.Screen
        name="follow"
        options={{
          headerShown: false,
          title: "팔로잉",
          tabBarIcon: ({ color, size }) => <Heart color={color} />,
        }}
      />
      <Tabs.Screen
        name="charge"
        options={{
          headerShown: false,
          title: "충전",
          tabBarIcon: ({ color, size }) => (
            <Charge color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          headerShown: false,
          title: "더보기",
          tabBarIcon: ({ color, size }) => <Menu color={color} />,
        }}
      />
      <Tabs.Screen
        name="modal-example"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
