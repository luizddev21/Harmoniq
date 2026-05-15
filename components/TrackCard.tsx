import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Track } from "../types/music";

type Props = {
  track: Track;
  liked: boolean;
  onPress: () => void;
  onLike: () => void;
  onAddToPlaylist: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
};

export function TrackCard({
  track,
  liked,
  onPress,
  onLike,
  onAddToPlaylist,
  onRemove,
  showRemove = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: "#111831",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#1F2A4A",
        padding: 12,
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Image
          source={{ uri: track.cover_medium || track.cover_big || track.cover }}
          style={{ width: 76, height: 76, borderRadius: 16, backgroundColor: "#1A2240" }}
        />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            numberOfLines={1}
            style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}
          >
            {track.title}
          </Text>
          <Text numberOfLines={1} style={{ color: "#A0A8C0", marginTop: 4 }}>
            {track.artist_name}
          </Text>
          <Text numberOfLines={1} style={{ color: "#6E78A0", marginTop: 4, fontSize: 12 }}>
            {track.album_title}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <TouchableOpacity
          onPress={onLike}
          activeOpacity={0.8}
          style={{
            backgroundColor: liked ? "#2C1630" : "#0D1429",
            borderRadius: 14,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Ionicons name={liked ? "heart" : "heart-outline"} size={16} color={liked ? "#FF5C8A" : "#FFFFFF"} />
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>{liked ? "Curtida" : "Curtir"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAddToPlaylist}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#0D1429",
            borderRadius: 14,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <MaterialIcons name="playlist-add" size={16} color="#7C5CFF" />
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Playlist</Text>
        </TouchableOpacity>

        {showRemove && onRemove ? (
          <TouchableOpacity
            onPress={onRemove}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#2B1018",
              borderRadius: 14,
              paddingVertical: 10,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MaterialIcons name="delete-outline" size={16} color="#FF7A95" />
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Remover</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
