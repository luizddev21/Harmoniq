import { FlatList, Text, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";
import { TrackCard } from "../../components/TrackCard";

export default function LikedScreen() {
  const {
    likes,
    isLiked,
    toggleLike,
    addToPlaylist,
  } = useMusic();

  const likedTracks = Object.values(likes);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050816",
        padding: 16,
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "800",
          }}
        >
          Curtidas
        </Text>

        <Text
          style={{
            color: "#A0A8C0",
            marginTop: 4,
          }}
        >
          Todas as músicas que você curtiu.
        </Text>
      </View>

      <FlatList
        data={likedTracks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="favorite-border"
              size={42}
              color="#7480A0"
            />

            <Text
              style={{
                color: "#A0A8C0",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Você ainda não curtiu nenhuma música.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            liked={isLiked(item.id)}
            onPress={() =>
              router.push({
                pathname: "/track/[id]",
                params: { id: String(item.id) },
              })
            }
            onLike={() => toggleLike(item)}
            onAddToPlaylist={() => addToPlaylist(item)}
          />
        )}
      />
    </View>
  );
}