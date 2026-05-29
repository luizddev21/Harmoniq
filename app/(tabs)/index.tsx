import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { getChartTracks } from "../../services/deezer";

import { Track } from "../../types/music";

import { TrackCard } from "../../components/TrackCard";

import { useMusic } from "../../context/MusicContext";

export default function HomeScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);

  const [loading, setLoading] = useState(true);

  const {
    toggleLike,
    addToPlaylist,
    removeFromPlaylist,
    isLiked,
    isInPlaylist,
  } = useMusic();

  useEffect(() => {
    loadTracks();
  }, []);

  async function loadTracks() {
    const data = await getChartTracks(20);

    setTracks(data);

    setLoading(false);
  }

  if (loading) {
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
    <FlatList
      data={tracks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 32,
        backgroundColor: "#050816",
      }}
      ListHeaderComponent={
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
          }}
          style={{
            height: 180,
            marginBottom: 20,
            justifyContent: "flex-end",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 20,
              backgroundColor: "rgba(5,8,22,0.55)",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              HARMONIQ
            </Text>

            <Text
              style={{
                color: "#D0D6EA",
                marginTop: 6,
              }}
            >
              Músicas em destaque
            </Text>
          </View>
        </ImageBackground>
      }
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
  );
}