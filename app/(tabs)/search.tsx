import { useState } from "react";

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { searchTracks } from "../../services/deezer";

import { Track } from "../../types/music";

import { TrackCard } from "../../components/TrackCard";

import { router } from "expo-router";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const [tracks, setTracks] = useState<Track[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;

    const data = await searchTracks(query);

    setTracks(data);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050816",
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#111831",
          borderRadius: 18,
          paddingHorizontal: 14,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <MaterialIcons
          name="search"
          size={20}
          color="#A0A8C0"
        />

        <TextInput
          placeholder="Buscar música"
          placeholderTextColor="#7480A0"
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            color: "white",
            marginLeft: 10,
          }}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Text
            style={{
              color: "#7C5CFF",
              fontWeight: "bold",
            }}
          >
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            onPress={() =>
              router.push({
                pathname: "/track/[id]",
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        )}
      />
    </View>
  );
}