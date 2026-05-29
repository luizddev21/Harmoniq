import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import { Ionicons } from "@expo/vector-icons";

import { getTrackById } from "../../services/deezer";

import { Track } from "../../types/music";

export default function TrackScreen() {
  const { id } = useLocalSearchParams();

  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    loadTrack();
  }, []);

  async function loadTrack() {
    const data = await getTrackById(Number(id));

    setTrack(data);
  }

  const player = useAudioPlayer(track?.preview || null);

  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  if (!track) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#050816",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050816",
        padding: 20,
      }}
    >
      <Image
        source={{
          uri: track.cover_xl,
        }}
        style={{
          width: "100%",
          height: 320,
          borderRadius: 24,
        }}
      />

      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        {track.title}
      </Text>

      <Text
        style={{
          color: "#A0A8C0",
          marginTop: 8,
          fontSize: 16,
        }}
      >
        {track.artist_name}
      </Text>

      <Text
        style={{
          color: "#6E78A0",
          marginTop: 4,
        }}
      >
        {track.album_title}
      </Text>

      <TouchableOpacity
        onPress={() => {
          if (status.playing) {
            player.pause();
          } else {
            player.play();
          }
        }}
        style={{
          marginTop: 30,
          backgroundColor: "#7C5CFF",
          padding: 16,
          borderRadius: 18,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={status.playing ? "pause" : "play"}
          size={20}
          color="white"
        />

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {status.playing ? "Pausar" : "Ouvir Preview"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}