# Harmoniq — Expo + Deezer

Base pronta para seu app de música com:

- Lista de músicas
- Tela de reprodução
- Botão Curtir
- Playlist personalizada
- Navbar com o nome do app

## Dependências

Instale no seu projeto Expo:

```bash
npx expo install expo-router expo-audio @react-native-async-storage/async-storage @expo/vector-icons
```

Se seu projeto ainda não estiver com o Expo Router configurado, confira o arquivo `app.json` e o `main` do projeto.

## Estrutura usada

- `app/(tabs)/index.tsx` → lista principal
- `app/(tabs)/search.tsx` → busca no Deezer
- `app/(tabs)/playlist.tsx` → playlist local
- `app/track/[id].tsx` → tela de reprodução
- `context/MusicContext.tsx` → curtidas e playlist com persistência local
- `services/deezer.ts` → integração com a API

## Observação importante sobre o Deezer

A API pública do Deezer é voltada para acesso a dados e, para apps comuns, o fluxo de áudio fica limitado ao preview de 30 segundos. O próprio Deezer também deixa claro que a API é usada para Search/Track/Playlist/Album/Artist e que há restrições de acesso/armazenamento de áudio. Confira as regras oficiais antes de publicar. 
