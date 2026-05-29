import { Tabs } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="music-note"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="search"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: "Curtidas",

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="favorite"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="playlist-play"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}