import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { searchTracks } from "../../services/deezer";
import { Track } from "../../types/music";
import { TrackCard } from "../../components/TrackCard";
import { useMusic } from "../../context/MusicContext";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const { isLiked, toggleLike, addToPlaylist } = useMusic();

  const runSearch = async () => {
    const term = query.trim();
    if (!term) return;
    setLoading(true);
    try {
      const data = await searchTracks(term);
      setTracks(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#050816", padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#111831",
          borderRadius: 18,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: "#1F2A4A",
        }}
      >
        <MaterialIcons name="search" size={20} color="#A0A8C0" />
        <TextInput
          placeholder="Digite um artista ou música"
          placeholderTextColor="#7480A0"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={runSearch}
          style={{ flex: 1, color: "#FFFFFF", fontSize: 15 }}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={runSearch} activeOpacity={0.8}>
          <Text style={{ color: "#7C5CFF", fontWeight: "700" }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
          ListEmptyComponent={
            <Text style={{ color: "#A0A8C0", textAlign: "center", marginTop: 32 }}>
              Faça uma busca para ver resultados.
            </Text>
          }
          renderItem={({ item }) => (
            <TrackCard
              track={item}
              liked={isLiked(item.id)}
              onPress={() => router.push({ pathname: "/track/[id]", params: { id: String(item.id) } })}
              onLike={() => toggleLike(item)}
              onAddToPlaylist={() => addToPlaylist(item)}
            />
          )}
        />
      )}
    </View>
  );
}
