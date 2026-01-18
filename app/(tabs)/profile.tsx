import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { handleLogout } from "@/src/services/authService";
import FAIcon from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
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
  createdAt: string;
  updatedAt: string;
}

export interface IProfileData {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDiabeteData {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClinicalData {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  // userData
  const [userData, setUserData] = useState<IUserData[]>([]);

  // //profileData
  const [profileData, setProfileData] = useState<IProfileData[]>([]);

  // //diabeteData
  const [diabeteData, setDiabeteData] = useState<IDiabeteData[]>([]);

  // //clinicalData
  const [clinicalData, setClinicalData] = useState<IClinicalData[]>([]);

  //userData - FETCH

  useEffect(() => {
    fetchUserData();
    // fetchProfileData();
    // fetchDiabeteData();
    // fetchClinicalData();
  }, []);

  const fetchUserData = async () => {
    try {
      api
        .get(`${API_URL}/users/user`)
        .then(({ data: response }) => {
          setUserData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  //profileData - FETCH
  const fetchProfileData = async () => {
    try {
      api
        .get(`${API_URL}/profiles/profile`)
        .then(({ data: response }) => {
          setProfileData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // //diabeteData - FETCH
  const fetchDiabeteData = async () => {
    try {
      api
        .get(`${API_URL}/diabete-profiles/diabete-profile`)
        .then(({ data: response }) => {
          // setDiabeteData([response.data]);
          console.log("diabete", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // //clinicalData - FETCH
  const fetchClinicalData = async () => {
    try {
      api
        .get(`${API_URL}/clinical-profiles/clinical-profile`)
        .then(({ data: response }) => {
          console.log("clinical", response.data);
          // setClinicalData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  return (
    <View className="flex-1 bg-white px-4">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">Perfil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PERFIL CARD */}
        <View className="bg-soft rounded-3xl p-4 flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-4">
            <Image
              source={require("../../src/assets/images/avatar.png")}
              className="w-20 h-20 rounded-full border-2 border-white"
            />

            <View>
              <Text className="text-sm text-primary">Olá 👋</Text>
              <Text className="text-xl font-bold text-primary">
                {userData[0].firstname.toUpperCase() +
                  " " +
                  userData[0].lastname.toUpperCase()}
              </Text>
              <Text className="text-sm text-gray-500">
                {userData[0].username.toLowerCase()}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center"
          >
            <FAIcon name="gear" size={22} color="#0A6B49" />
          </TouchableOpacity>
        </View>

        <SectionHeader title="Dados Pessoais" />

        <InfoItem
          icon="person-outline"
          label="Nome completo"
          value={
            userData[0].firstname.toUpperCase() +
            " " +
            userData[0].lastname.toUpperCase()
          }
        />
        <InfoItem
          icon="at-outline"
          label="Username"
          value={userData[0].username}
        />
        <InfoItem icon="mail-outline" label="Email" value={userData[0].email} />
        <InfoItem icon="male-outline" label="Sexo" value="Masculino" />

        <SectionHeader title="Dados Médicos" />

        <InfoItem
          icon="medkit-outline"
          label="Tipo de diabetes"
          value="Tipo 2"
        />
        <InfoItem
          icon="analytics-outline"
          label="Glicemia alvo"
          value="80 – 130 mg/dL"
        />
        <InfoItem icon="fitness-outline" label="Peso" value="78 kg" />
        <InfoItem
          icon="heart-outline"
          label="Condição associada"
          value="Nenhuma"
        />
        <Pressable
          onPress={() => {
            router.push("/profileMedical");
          }}
          className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-200 "
        >
          <View className="flex-row items-center gap-3 ">
            <Icon name="pulse" size={22} color="#000" />
            <Text className="text-base font-semibold">Ver Tudo</Text>
          </View>
          <Icon name="chevron-forward-outline" size={22} color="#999" />
        </Pressable>

        <View className="h-10" />
        <TouchableHighlight
          onPress={async () => {
            await handleLogout();
            router.push("/(auth)/login");
          }}
          className="bg-red-100 border border-gray-200 rounded-2xl p-4 mb-4"
        >
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Icon name="log-out" size={18} color="#ef4444;" />
              <Text className="text-sm font-semibold text-gray-700">
                Log Out
              </Text>
            </View>
            <Text className="text-base text-gray-600">
              Sair da conta agora.
            </Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

/* ===================== COMPONENTES ===================== */

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-4">
      <Text className="text-lg font-semibold text-primary">{title}</Text>
      <Icon name="create-outline" size={22} color="#0A6B49" />
    </View>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-2">
      <View className="flex-row items-center gap-2 mb-1">
        <Icon name={icon} size={18} color="#0A6B49" />
        <Text className="text-sm font-semibold text-gray-700">{label}</Text>
      </View>
      <Text className="text-base text-gray-600">{value}</Text>
    </View>
  );
}
