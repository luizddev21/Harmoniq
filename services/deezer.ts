import { Track } from "../types/music";

const CORSPROXY_API_KEY = "938bcc81";
const DEEZER_URL = "https://api.deezer.com";

function mapTrack(raw: any): Track {
  return {
    id: Number(raw.id),
    title: raw.title ?? "Sem título",
    preview: raw.preview ?? "",
    duration: Number(raw.duration ?? 0),
    artist_name: raw.artist?.name ?? "Artista desconhecido",
    album_title: raw.album?.title ?? "Álbum desconhecido",
    cover: raw.album?.cover ?? "",
    cover_medium: raw.album?.cover_medium ?? "",
    cover_big: raw.album?.cover_big ?? "",
    cover_xl: raw.album?.cover_xl ?? "",
  };
}

async function requestJson(path: string) {
  const targetUrl = `${DEEZER_URL}${path}`;

  const proxyUrl =
    `https://corsproxy.io/?key=${encodeURIComponent(CORSPROXY_API_KEY)}` +
    `&url=${encodeURIComponent(targetUrl)}`;

  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error(`Erro Deezer: ${response.status}`);
  }

  return response.json();
}

export async function getChartTracks(limit = 20): Promise<Track[]> {
  const json = await requestJson(
    `/chart/0/tracks?limit=${encodeURIComponent(limit)}`
  );

  return json.data.map(mapTrack);
}

export async function searchTracks(query: string): Promise<Track[]> {
  const json = await requestJson(
    `/search?q=${encodeURIComponent(query)}`
  );

  return json.data.map(mapTrack);
}

export async function getTrackById(id: number): Promise<Track> {
  const json = await requestJson(`/track/${encodeURIComponent(id)}`);

  return mapTrack(json);
}