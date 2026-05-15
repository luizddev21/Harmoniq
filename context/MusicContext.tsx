import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Track } from "../types/music";

type MusicContextValue = {
  likes: Record<number, Track>;
  playlist: Track[];
  isLiked: (id: number) => boolean;
  toggleLike: (track: Track) => void;
  addToPlaylist: (track: Track) => void;
  removeFromPlaylist: (id: number) => void;
  clearPlaylist: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

const LIKES_KEY = "@harmoniq:likes";
const PLAYLIST_KEY = "@harmoniq:playlist";

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<Record<number, Track>>({});
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [likesRaw, playlistRaw] = await Promise.all([
          AsyncStorage.getItem(LIKES_KEY),
          AsyncStorage.getItem(PLAYLIST_KEY),
        ]);

        if (likesRaw) setLikes(JSON.parse(likesRaw));
        if (playlistRaw) setPlaylist(JSON.parse(playlistRaw));
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }, [hydrated, likes]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlist));
  }, [hydrated, playlist]);

  const api = useMemo<MusicContextValue>(() => {
    return {
      likes,
      playlist,
      isLiked: (id) => Boolean(likes[id]),
      toggleLike: (track) => {
        setLikes((current) => {
          const next = { ...current };
          if (next[track.id]) {
            delete next[track.id];
          } else {
            next[track.id] = track;
          }
          return next;
        });
      },
      addToPlaylist: (track) => {
        setPlaylist((current) => {
          if (current.some((item) => item.id === track.id)) return current;
          return [track, ...current];
        });
      },
      removeFromPlaylist: (id) => {
        setPlaylist((current) => current.filter((item) => item.id !== id));
      },
      clearPlaylist: () => setPlaylist([]),
    };
  }, [likes, playlist]);

  return <MusicContext.Provider value={api}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used inside MusicProvider");
  }
  return ctx;
}
