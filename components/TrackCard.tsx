import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Track } from "../types/music";

type Props = {
  track: Track;

  onPress: () => void;

  liked: boolean;

  onLike: () => void;

  onPlaylist: () => void;

  inPlaylist: boolean;
};

export function TrackCard({
  track,
  onPress,
  liked,
  onLike,
  onPlaylist,
  inPlaylist,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#111831",
        borderRadius: 20,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: track.cover_medium,
          }}
          style={{
            width: 76,
            height: 76,
            borderRadius: 16,
          }}
        />

        <View
          style={{
            marginLeft: 12,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {track.title}
          </Text>

          <Text
            style={{
              color: "#A0A8C0",
              marginTop: 4,
            }}
          >
            {track.artist_name}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              color: "#6E78A0",
              marginTop: 4,
              fontSize: 12,
            }}
          >
            {track.album_title}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          marginTop: 14,
        }}
      >
        <TouchableOpacity
          onPress={onLike}
          style={{
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              color: "white",
              marginLeft: 6,
            }}
          >
            Curtir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPlaylist}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              color: "white",
              marginLeft: 6,
            }}
          >
            {inPlaylist
              ? "Remover"
              : "Playlist"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}