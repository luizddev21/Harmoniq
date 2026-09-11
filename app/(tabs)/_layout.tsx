import { Tabs } from "expo-router";

import {
  Heart,
  Home,
  ListMusic,
  Search,
  Share2,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0B1020",
        },

        headerTintColor: "#FFFFFF",

        tabBarStyle: {
          backgroundColor: "#0B1020",
          borderTopColor: "#1A2240",
        },

        tabBarActiveTintColor: "#7C5CFF",

        tabBarInactiveTintColor: "#A0A8C0",

        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",

          tabBarIcon: ({ color, size }) => (
            <Home
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",

          tabBarIcon: ({ color, size }) => (
            <Search
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: "Curtidas",

          tabBarIcon: ({ color, size }) => (
            <Heart
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",

          tabBarIcon: ({ color, size }) => (
            <ListMusic
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="share"
        options={{
          title: "Compartilhar",

          tabBarIcon: ({ color, size }) => (
            <Share2
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}