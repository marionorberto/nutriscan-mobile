import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { updateUserInfo } from "@/src/services/profile/updateUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface IUserData {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  img: string;
  role: string;
  associatedCondition: {
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export default function EditUserScreen() {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  // userData
  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Usando await corretamente para o try/catch funcionar
      const response = await api.get(`${API_URL}/users/user`);
      setUserData(response.data.data);
    } catch (error: any) {
      console.error("Erro no profile page:", error);
      Alert.alert("Ops!", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userData) return;

    try {
      setLoading(true);
      await updateUserInfo(userData);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error: any) {
      Alert.alert(
        "Ops! Algo deu errado", // Título

        error.message, // Mensagem vinda do throw da API

        [{ text: "Entendido" }], // Botão de fechar
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  // Se não houver userData, evita crash ao tentar acessar propriedades
  if (!userData) return null;

  return (
    <View className="flex-1 bg-white px-4">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">
          Edite os seus Dados
        </Text>
      </View>
      <View className="py-4">
        <Text className="text-2xl font-bold text-primary">Dados a Editar</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Analise bem cada campo antes de editar
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IDENTIFICAÇÃO */}
        <Section title="Identificação do paciente" />

        <MedicalItem
          label="Primeiro Nome"
          value={userData.firstname}
          onChangeText={(text: string) => {
            setUserData({ ...userData, firstname: text });
          }}
        />
        <MedicalItem
          label="Último Nome"
          value={userData.lastname}
          onChangeText={(text: string) => {
            setUserData({ ...userData, lastname: text });
          }}
        />
        <MedicalItem
          label="Username"
          value={userData.username}
          onChangeText={(text: string) => {
            setUserData({ ...userData, username: text });
          }}
        />
        <MedicalItem
          label="Email"
          value={userData.email}
          disabled={true}
          onChangeText={(text: string) => {
            setUserData({ ...userData, email: text });
          }}
        />
        <MedicalItem
          label="Status"
          value={userData.role}
          disabled={true}
          onChangeText={(text: string) => {
            setUserData({ ...userData, role: text });
          }}
        />

        {/* CTA */}
        <View className="mt-auto pb-10 pt-10">
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            className={`py-4 rounded-2xl items-center shadow-sm ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-xl">
                Salvar Alterações
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ===================== COMPONENTES ===================== */

function Section({ title }: { title: string }) {
  return (
    <Text className="text-lg font-semibold text-primary mt-4 mb-2">
      {title}
    </Text>
  );
}

function MedicalItem({
  label,
  value,
  onChangeText,
  disabled = false,
}: {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        className={`bg-white border border-gray-200 rounded-2xl p-4 mb-2 ${disabled ? "bg-gray-100 border-gray-200 text-gray-400" : "bg-white border-gray-200"}`}
      />
    </View>
  );
}
