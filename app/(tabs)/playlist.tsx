import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";
import { TrackCard } from "../../components/TrackCard";

export default function PlaylistScreen() {
  const { playlist, removeFromPlaylist, clearPlaylist, isLiked, toggleLike, addToPlaylist } = useMusic();

  const confirmClear = () => {
    if (!playlist.length) return;
    Alert.alert("Limpar playlist", "Deseja remover todas as músicas da playlist?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Limpar", style: "destructive", onPress: clearPlaylist },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#050816", padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "800" }}>
          Sua playlist
        </Text>
        <Text style={{ color: "#A0A8C0", marginTop: 4 }}>
          Monte sua seleção personalizada com as faixas que você mais curtir.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        <TouchableOpacity
          onPress={confirmClear}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#111831",
            borderColor: "#1F2A4A",
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Limpar tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlist}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <MaterialIcons name="playlist-remove" size={42} color="#7480A0" />
            <Text style={{ color: "#A0A8C0", marginTop: 10, textAlign: "center" }}>
              Ainda não há músicas na sua playlist.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            liked={isLiked(item.id)}
            onPress={() => router.push({ pathname: "/track/[id]", params: { id: String(item.id) } })}
            onLike={() => toggleLike(item)}
            onAddToPlaylist={() => addToPlaylist(item)}
            onRemove={() => removeFromPlaylist(item.id)}
            showRemove
          />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}
