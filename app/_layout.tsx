import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MusicProvider } from "../context/MusicContext";

export default function RootLayout() {
  return (
    <MusicProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0B1020" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#050816" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="track/[id]"
          options={{
            title: "Reprodução",
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </MusicProvider>
  );
}
