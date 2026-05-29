import { createContext, useContext, useState } from "react";

import { Track } from "../types/music";

type MusicContextType = {
  liked: Track[];

  playlist: Track[];

  toggleLike: (track: Track) => void;

  addToPlaylist: (track: Track) => void;

  removeFromPlaylist: (id: number) => void;

  isLiked: (id: number) => boolean;

  isInPlaylist: (id: number) => boolean;
};

const MusicContext = createContext({} as MusicContextType);

export function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [liked, setLiked] = useState<Track[]>([]);

  const [playlist, setPlaylist] = useState<Track[]>([]);

  function toggleLike(track: Track) {
    const exists = liked.find(
      (item) => item.id === track.id
    );

    if (exists) {
      setLiked(
        liked.filter((item) => item.id !== track.id)
      );
    } else {
      setLiked([...liked, track]);
    }
  }

  function addToPlaylist(track: Track) {
    const exists = playlist.find(
      (item) => item.id === track.id
    );

    if (exists) return;

    setPlaylist([...playlist, track]);
  }

  function removeFromPlaylist(id: number) {
    setPlaylist(
      playlist.filter((item) => item.id !== id)
    );
  }

  function isLiked(id: number) {
    return liked.some((item) => item.id === id);
  }

  function isInPlaylist(id: number) {
    return playlist.some(
      (item) => item.id === id
    );
  }

  return (
    <MusicContext.Provider
      value={{
        liked,
        playlist,
        toggleLike,
        addToPlaylist,
        removeFromPlaylist,
        isLiked,
        isInPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}