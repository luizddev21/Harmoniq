import { useMemo } from "react";

import {
    Alert,
    Linking,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

import {
    Copy,
    ExternalLink,
    QrCode,
    Share2,
} from "lucide-react-native";

import * as Clipboard from "expo-clipboard";

export default function ShareScreen() {
  const appUrl = useMemo(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      return window.location.origin;
    }

    return "https://seu-app.com";
  }, []);

  async function copyLink() {
    await Clipboard.setStringAsync(appUrl);

    if (Platform.OS === "web") {
      alert("Link copiado!");
    } else {
      Alert.alert(
        "Link copiado",
        "O link do HARMONIQ foi copiado."
      );
    }
  }

  async function openLink() {
    await Linking.openURL(appUrl);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050816",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: "#111831",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <Share2
              size={30}
              color="#7C5CFF"
              strokeWidth={2}
            />
          </View>

          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Compartilhe o HARMONIQ
          </Text>

          <Text
            style={{
              color: "#A0A8C0",
              fontSize: 16,
              textAlign: "center",
              marginTop: 10,
              lineHeight: 23,
            }}
          >
            Aponte a câmera do celular para o QR Code
            {"\n"}
            para acessar o aplicativo.
          </Text>
        </View>

        {/* QR Code */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 26,

              elevation: 10,

              shadowColor: "#000",
              shadowOpacity: 0.35,
              shadowRadius: 20,
              shadowOffset: {
                width: 0,
                height: 10,
              },
            }}
          >
            <QRCode
              value={appUrl}
              size={220}
              color="#050816"
              backgroundColor="white"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <QrCode
              size={18}
              color="#7C5CFF"
            />

            <Text
              style={{
                color: "#A0A8C0",
                marginLeft: 8,
              }}
            >
              Escaneie para acessar
            </Text>
          </View>
        </View>

        {/* Botões */}
        <View
          style={{
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={copyLink}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#111831",
              borderRadius: 18,
              padding: 16,
              minHeight: 56,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Copy
              size={20}
              color="#FFFFFF"
            />

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Copiar link
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openLink}
            activeOpacity={0.8}
            style={{
              marginTop: 12,
              backgroundColor: "#7C5CFF",
              borderRadius: 18,
              padding: 16,
              minHeight: 56,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExternalLink
              size={20}
              color="#FFFFFF"
            />

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Abrir aplicativo
            </Text>
          </TouchableOpacity>
        </View>

        {/* URL */}
        <Text
          style={{
            color: "#6E78A0",
            textAlign: "center",
            marginTop: 18,
            fontSize: 12,
            paddingHorizontal: 10,
          }}
          numberOfLines={2}
        >
          {appUrl}
        </Text>
      </ScrollView>
    </View>
  );
}
