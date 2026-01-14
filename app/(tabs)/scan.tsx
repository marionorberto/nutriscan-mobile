import { setCameraRef, takePhoto } from "@/src/services/camera-service";
import Icon from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  async function handleTakePhoto() {
    const photo = await takePhoto();
    setPhotoUri(photo.uri);
    setIsCameraOpen(false); // fecha a câmera
  }

  function resetPhoto() {
    setPhotoUri(null);
    setIsCameraOpen(true);
  }

  if (!permission?.granted) {
    return <Text>Permissão da câmera necessária</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white px-4">
      {/* HEADER */}

      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100 mb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">
          Scan de alimento
        </Text>
      </View>

      {/* INSTRUÇÕES */}
      <View className="items-center mt-2 mb-2 px-6">
        <Text className="text-base font-medium text-primary text-center">
          Fotografe o alimento
        </Text>
        <Text className="text-sm text-zinc-500 text-center mt-1">
          Centralize o alimento dentro da moldura para uma análise mais precisa
        </Text>
      </View>
      {/* DICAS */}
      <View className="mb-6 bg-soft rounded-2xl px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Icon name="bulb-outline" size={18} color="#24B370" />
          <Text className="text-sm text-secondary">
            Evite sombras e fundos muito escuros
          </Text>
        </View>
      </View>

      {/* ÁREA DE SCAN */}
      <View className="flex-1 items-center justify-center">
        <View className="w-100">
          {/* First to be shown */}
          {!isCameraOpen && !photoUri && (
            <View className="w-72 h-72 rounded-3xl border-2 border-dashed border-primary bg-soft items-center justify-center">
              <Icon name="scan-outline" size={40} color="#0A6B49" />
              <Text className="text-primary text-sm mt-2">
                Alimento visível aqui
              </Text>
            </View>
          )}

          {/* CAMERA */}
          {isCameraOpen && !photoUri && (
            <View className="rounded-3xl border-2 border-dashed border-primary bg-soft items-center justify-center p-3">
              <CameraView
                style={styles.camera}
                ref={(ref) => setCameraRef(ref)}
              />
            </View>
          )}

          {photoUri && (
            <View
              className={`rounded-3xl border-2 border-dashed  border-primary bg-soft items-center justify-center p-3 ${photoUri ? "border-red-800" : "border-black"}`}
            >
              {/* PREVIEW DA FOTO */}
              <Image
                source={{ uri: photoUri }}
                style={{ width: 300, height: 400 }}
              />
            </View>
          )}
        </View>
      </View>

      {/* CONTROLES */}
      <View className="pb-10 mt-5">
        {!isCameraOpen && !photoUri && (
          <TouchableOpacity
            onPress={() => setIsCameraOpen(true)}
            className="self-center mb-8 active:scale-95"
          >
            <View className="relative">
              <View className="h-24 w-24 rounded-full border-4 border-primary items-center justify-center">
                <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
                  <Icon name="camera-outline" size={26} color="#000" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {isCameraOpen && !photoUri && (
          <TouchableOpacity
            onPress={handleTakePhoto}
            className="self-center mb-8 active:scale-95"
          >
            <View className="relative">
              <View className="h-24 w-24 rounded-full border-4 border-primary items-center justify-center bg-green-500">
                <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
                  <Icon name="camera-outline" size={26} color="#000" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {photoUri && <Button title="Tirar outra foto" onPress={resetPhoto} />}

        <View className="flex-row justify-between px-4 mt-5">
          <TouchableOpacity className="flex-row items-center gap-2 bg-soft px-4 py-3 rounded-xl">
            <Icon name="create-outline" size={18} color="#0A6B49" />
            <Text className="text-sm font-medium text-primary">
              Carregar Imagem
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/scan-history-screen");
            }}
            className="flex-row items-center gap-2 bg-soft px-4 py-3 rounded-xl"
          >
            <Icon name="time-outline" size={18} color="#0A6B49" />
            <Text className="text-sm font-medium text-primary">Histórico</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  camera: {
    width: 300,
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },
});
