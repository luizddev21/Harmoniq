import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { MusicProvider } from "../context/MusicContext";

export default function Layout() {
  return (
    <MusicProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0B1020",
          },

          headerTintColor: "#FFFFFF",

          contentStyle: {
            backgroundColor: "#050816",
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="track/[id]"
          options={{
            title: "Música",
          }}
        />
      </Stack>
    </MusicProvider>
  );
}