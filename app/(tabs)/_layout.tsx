import { Tabs } from "expo-router";


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
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
        }}
      />

      <Tabs.Screen
        name="liked"
        options={{
          title: "Curtidas",
        }}
      />

      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",
        }}
      />
    </Tabs>
  );
}