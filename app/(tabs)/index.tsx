import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getChartTracks, searchTracks } from "../../services/deezer";
import { Track } from "../../types/music";
import { TrackCard } from "../../components/TrackCard";
import { useMusic } from "../../context/MusicContext";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { isLiked, toggleLike, addToPlaylist } = useMusic();

  const loadFeatured = async () => {
    const data = await getChartTracks(20);
    setTracks(data);
  };

  useEffect(() => {
    loadFeatured().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadFeatured();
    } finally {
      setRefreshing(false);
    }
  };

  const onSearch = async () => {
    const term = query.trim();
    if (!term) {
      await loadFeatured();
      return;
    }
    setLoading(true);
    try {
      const data = await searchTracks(term);
      setTracks(data);
    } finally {
      setLoading(false);
    }
  };

  const headerText = useMemo(() => {
    return query.trim() ? `Resultados para "${query.trim()}"` : "Músicas em destaque";
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: "#050816" }}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View style={{ gap: 16, marginBottom: 20 }}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
              }}
              style={{
                borderRadius: 24,
                overflow: "hidden",
                minHeight: 180,
                justifyContent: "flex-end",
              }}
              imageStyle={{ borderRadius: 24, opacity: 0.65 }}
            >
              <View
                style={{
                  padding: 18,
                  backgroundColor: "rgba(5,8,22,0.55)",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 30,
                    fontWeight: "800",
                  }}
                >
                  HARMONIQ
                </Text>
                <Text style={{ color: "#D0D6EA", marginTop: 6 }}>
                  Descubra, curta e monte sua playlist personalizada.
                </Text>
              </View>
            </ImageBackground>

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
              <Ionicons name="search" size={18} color="#A0A8C0" />
              <TextInput
                placeholder="Buscar músicas no Deezer"
                placeholderTextColor="#7480A0"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={onSearch}
                style={{ flex: 1, color: "#FFFFFF", fontSize: 15 }}
                returnKeyType="search"
              />
              <TouchableOpacity onPress={onSearch} activeOpacity={0.8}>
                <Text style={{ color: "#7C5CFF", fontWeight: "700" }}>Ir</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "700" }}>
              {headerText}
            </Text>
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          loading ? (
            <View style={{ paddingTop: 48 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={{ color: "#A0A8C0", textAlign: "center", marginTop: 30 }}>
              Nenhuma música encontrada.
            </Text>
          )
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
    </View>
  );
}
