import {
    FlatList,
    Text,
    View,
} from "react-native";

import { router } from "expo-router";

import { useMusic } from "../../context/MusicContext";

import { TrackCard } from "../../components/TrackCard";

export default function LikedScreen() {
    const {
        liked,
        toggleLike,
        addToPlaylist,
        removeFromPlaylist,
        isLiked,
        isInPlaylist,
      } = useMusic();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#050816",
                padding: 16,
            }}
        >
            <FlatList
                data={liked}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            marginTop: 40,
                        }}
                    >
                        Nenhuma curtida
                    </Text>
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
        </View>
    );
}