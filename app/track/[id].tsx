import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from "expo-audio";
import { getTrackById } from "../../services/deezer";
import { Track } from "../../types/music";
import { useMusic } from "../../context/MusicContext";

export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLiked, toggleLike, addToPlaylist } = useMusic();

  useEffect(() => {
    (async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
        interruptionMode: "mixWithOthers",
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getTrackById(Number(id));
        setTrack(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const player = useAudioPlayer(track?.preview ?? null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);

  const progress = useMemo(() => {
    if (!status.duration || !status.currentTime) return 0;
    return Math.min(status.currentTime / status.duration, 1);
  }, [status.currentTime, status.duration]);

  if (loading || !track) {
    return (
      <View style={{ flex: 1, backgroundColor: "#050816", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  const liked = isLiked(track.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#050816" }} contentContainerStyle={{ paddingBottom: 32 }}>
      <ImageBackground
        source={{ uri: track.cover_xl || track.cover_big || track.cover_medium }}
        style={{ minHeight: 360, justifyContent: "flex-end" }}
        imageStyle={{ opacity: 0.4 }}
      >
        <View style={{ padding: 18, backgroundColor: "rgba(5,8,22,0.66)" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 28, fontWeight: "800" }}>{track.title}</Text>
          <Text style={{ color: "#D0D6EA", marginTop: 6 }}>
            {track.artist_name} • {track.album_title}
          </Text>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
            <TouchableOpacity
              onPress={() => {
                if (status.playing) {
                  player.pause();
                } else {
                  player.play();
                }
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#7C5CFF",
                paddingVertical: 12,
                paddingHorizontal: 18,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Ionicons name={status.playing ? "pause" : "play"} size={18} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>
                {status.playing ? "Pausar" : "Ouvir preview"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleLike(track)}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#111831",
                borderColor: "#1F2A4A",
                borderWidth: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "#FF5C8A" : "#FFFFFF"} />
              <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                {liked ? "Curtido" : "Curtir"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={{ padding: 18, gap: 14 }}>
        <View
          style={{
            backgroundColor: "#111831",
            borderRadius: 18,
            padding: 14,
            borderWidth: 1,
            borderColor: "#1F2A4A",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>Progresso do preview</Text>
          <View
            style={{
              height: 8,
              backgroundColor: "#1F2A4A",
              borderRadius: 999,
              marginTop: 12,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${Math.max(progress * 100, 2)}%`,
                height: "100%",
                backgroundColor: "#7C5CFF",
              }}
            />
          </View>
          <Text style={{ color: "#A0A8C0", marginTop: 10 }}>
            O Deezer disponibiliza o preview de 30 segundos para a API pública.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => addToPlaylist(track)}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#111831",
            borderWidth: 1,
            borderColor: "#1F2A4A",
            borderRadius: 18,
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialIcons name="playlist-add" size={22} color="#7C5CFF" />
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Adicionar à playlist</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#A0A8C0" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
