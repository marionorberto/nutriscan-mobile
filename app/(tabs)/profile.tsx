import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { handleLogout } from "@/src/services/authService";
import FAIcon from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
  associatedCondition: {
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface IProfileData {
  id: string;
  birthday: string;
  address: string;
  phone: string;
  gender: string;
  img: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDiabeteData {
  id: string;
  diabetiType: string;
  diagnosisYear: string;
  currentStatus: string;
  lastFastingGlucose: string;
  lastHba1c: number;
  hypoGlycemiaFrequency: string;
  hyperGlycemiaFrequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClinicalData {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  physicalActivityLevel: string;
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

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchUserData();
      fetchProfileData();
      fetchDiabeteData();
      fetchClinicalData();

      return () => {
        // Opcional: código quando sai da tela
      };
    }, []),
  );

  useEffect(() => {
    fetchUserData();
    fetchProfileData();
    fetchDiabeteData();
    fetchClinicalData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      api
        .get(`${API_URL}/users/user`)
        .then(({ data: response }) => {
          setUserData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      // 2. Feedback de Erro para o usuário
      console.log("Erro no profile page:", error.message);

      Alert.alert(
        "Ops! Algo deu errado", // Título
        error.message, // Mensagem vinda do throw da API
        [{ text: "Entendido" }], // Botão de fechar
      );
    } finally {
      setLoading(false);
    }
  };

  //profileData - FETCH
  const fetchProfileData = async () => {
    try {
      setLoading(true);

      api
        .get(`${API_URL}/profiles/profile`)
        .then(({ data: response }) => {
          setProfileData([response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      // 2. Feedback de Erro para o usuário
      console.log("Erro no profile page:", error.message);

      Alert.alert(
        "Ops! Algo deu errado", // Título
        error.message, // Mensagem vinda do throw da API
        [{ text: "Entendido" }], // Botão de fechar
      );
    } finally {
      setLoading(false);
    }
  };

  // //diabeteData - FETCH
  const fetchDiabeteData = async () => {
    try {
      setLoading(true);

      api
        .get(`${API_URL}/diabete-profiles/diabete-profile`)
        .then(({ data: response }) => {
          setDiabeteData([response.data]);
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
      setLoading(true);

      api
        .get(`${API_URL}/clinical-profiles/one`)
        .then(({ data: response }) => {
          setClinicalData([response.data]);
        })
        .catch((error) => {
          console.log(error.message);
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

  if (
    loading ||
    !userData[0] ||
    !profileData[0] ||
    !diabeteData[0] ||
    !clinicalData[0]
  ) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  // console.log(userData[0].associatedCondition);

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
            {/* <Text className="text-lg font-semibold text-primary">M</Text> */}
            <Image
              source={{
                uri: `${profileData[0].img}`,
              }}
              className="w-14 h-14 rounded-full border-2 border-white"
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

        <SectionHeader
          onPress={() => {
            router.push("/EditUserInfo");
          }}
          title="Dados Pessoais"
        />

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
        <InfoItem
          icon="male-outline"
          label="Sexo"
          value={profileData[0].gender == "M" ? "Masculino" : "Feminino"}
        />

        <SectionHeader
          onPress={() => {
            router.push("/EditDiabeteInfo");
          }}
          title="Dados Médicos"
        />

        <InfoItem
          icon="medkit-outline"
          label="Tipo de diabetes"
          value={diabeteData[0].diabetiType}
        />
        <InfoItem
          icon="analytics-outline"
          label="Glicemia alvo"
          // value="80 – 130 mg/dL"
          value={diabeteData[0].lastFastingGlucose + " mg/dL"}
        />
        <InfoItem
          icon="fitness-outline"
          label="Peso"
          value={clinicalData[0].weight + " kg"}
        />
        <InfoItem
          icon="heart-outline"
          label="Condição associada"
          value={
            userData[0].associatedCondition.length > 0
              ? userData[0].associatedCondition
                  .map(
                    (item: {
                      id: string;
                      description: string;
                      createdAt: string;
                      updatedAt: string;
                    }) => item.description,
                  )
                  .join(" / ")
              : "Nenhuma"
          }
        />
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/profileMedical",
              params: {
                userID,
              },
            });
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

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-4">
      <Text className="text-lg font-semibold text-primary">{title}</Text>
      <Icon onPress={onPress} name="create-outline" size={22} color="#0A6B49" />
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
