import { LoadingOverlay } from "@/src/components/costum-activity-indicator";
import { setCameraRef, takePhoto } from "@/src/services/camera-service";
import { handleAnalyzeImage } from "@/src/services/vision";
import { useScanStore } from "@/src/store/useScanStore";
import Icon from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

interface IEvaluation {
  analysisSummary: {
    overallSafetyStatus: "GREEN" | "YELLOW" | "RED";
    totalCarbsScanned: number;
  };
  foodItemsEvaluated: [
    {
      name: string;
      isSafeForAllergies: boolean;
      glycemicImpact: "LOW" | "MEDIUM" | "HIGH";
      recommendation: string;
    },
  ];
  finalMedicalVerdict: {
    isRecommended: boolean;
    title: string;
    reason: string;
    suggestedPortion: string;
    alternatives: string[];
  };
}

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<IEvaluation | null>(null);
  // ... dentro do componente
  const setEvaluationStore = useScanStore((state) => state.setEvaluationT);

  function closeCamera() {
    setIsCameraOpen(false);
    setPhotoUri(null); // Opcional: limpa a foto se quiser resetar tudo ao fechar
  }

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Deve permitir que a sua aplicação acesse as images!",
      );
    } else {
      let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        if (assets) {
          // Verifique se profileData não é null
          setPhotoUri(assets[0].uri);
        }
      }
    }
  };

  async function handleTakePhoto() {
    const photo = await takePhoto();
    setPhotoUri(photo.uri);
    setIsCameraOpen(false); // fecha a câmera
  }

  function resetPhoto() {
    setPhotoUri(null);
    setIsCameraOpen(true);
  }

  const analyzePhoto = async () => {
    //    1. Verificação inicial (Guard Clause)
    console.log(photoUri);
    if (!photoUri) {
      ToastAndroid.show(
        "Tire ou selecione uma foto primeiro!",
        ToastAndroid.SHORT,
      );
      return;
    }

    // if (photoUri) {
    //   ToastAndroid.show(
    //     "Fazer a funcionalidade para ver se tem internet ou não",
    //     ToastAndroid.SHORT,
    //   )
    //   return;
    // }

    try {
      setLoading(true);

      const result = await handleAnalyzeImage(photoUri);

      // 1. Salva no estado global
      setEvaluationStore(result.data);

      router.push("/EvaluationResult");
      ToastAndroid.show("Análise concluída com sucesso!", ToastAndroid.SHORT);
    } catch (error: any) {
      // 2. Feedback de Erro para o usuário
      console.log("Erro no scan:", error.message);

      Alert.alert(
        "Ops! Algo deu errado", // Título
        error.message, // Mensagem vinda do throw da API
        [{ text: "Entendido" }], // Botão de fechar
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission?.granted) {
    return <Text>Permissão da câmera necessária</Text>;
  }

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
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

        {photoUri && (
          <TouchableOpacity
            onPress={resetPhoto}
            className="bg-green-500/90 p-2 rounded-lg py-3 mb-3"
          >
            <Text className="text-green-100 font-semibold text-lg text-center">
              Tirar Outra Foto
              <Icon name="scan-outline" size={18} color="#0A6B49" />
            </Text>
          </TouchableOpacity>
        )}
        {photoUri && (
          <TouchableOpacity
            onPress={analyzePhoto}
            className="bg-green-400/40 p-2 rounded-lg"
          >
            <Text className="text-green-600 font-semibold text-lg text-center">
              Analizar Foto
              <Icon name="refresh" size={18} color="#0A6B49" />
            </Text>
          </TouchableOpacity>
        )}

        {/* Substitua o botão do final por este */}
        {(isCameraOpen || photoUri) && (
          <TouchableOpacity
            onPress={closeCamera}
            className="bg-red-100 p-2 rounded-lg mt-3"
          >
            <Text className="text-red-600 font-semibold text-lg text-center">
              Cancelar e Sair{" "}
              <Icon name="close-circle-outline" size={18} color="red" />
            </Text>
          </TouchableOpacity>
        )}

        <LoadingOverlay visible={loading} />

        <View className="flex-row justify-between px-4 mt-5">
          <TouchableOpacity
            onPress={pickImage}
            className="flex-row items-center gap-2 bg-soft px-4 py-3 rounded-xl"
          >
            <Icon name="create-outline" size={18} color="#0A6B49" />
            <Text className="text-sm font-medium text-primary">
              Carregar Imagem
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/scan-history-screen");
              // router.push("/EvaluationResult");
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
