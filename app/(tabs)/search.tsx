import { useState } from "react";

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


import { searchTracks } from "../../services/deezer";

import { Track } from "../../types/music";

import { TrackCard } from "../../components/TrackCard";

import { useMusic } from "../../context/MusicContext";

import { router } from "expo-router";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const [tracks, setTracks] = useState<Track[]>([]);

  const {
    toggleLike,
    addToPlaylist,
    removeFromPlaylist,
    isLiked,
    isInPlaylist,
  } = useMusic();

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
          liked={isLiked(item.id)}
          inPlaylist={isInPlaylist(item.id)}
          onLike={() => toggleLike(item)}
          onPlaylist={() => {
            if (isInPlaylist(item.id)) {
              removeFromPlaylist(item.id);
            } else {
              addToPlaylist(item);
            }
          }}
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