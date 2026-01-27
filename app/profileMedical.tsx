import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
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
  address: {
    municipy: string;
    neighbourhood: string;
    province: string;
  };
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

export default function MedicalProfileScreen() {
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

  console.log(profileData[0].address.municipy);

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

        <Text className="text-2xl font-bold text-primary">Perfil Médico</Text>
      </View>
      <View className="py-4">
        <Text className="text-2xl font-bold text-primary">Meus Dados</Text>
        <Text className="text-sm text-gray-500 mt-1">Informações pessoais</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IDENTIFICAÇÃO */}
        <Section
          onPress={() => router.push("/EditUserInfo")}
          title="Identificação do Paciente"
        />

        <MedicalItem label="Primeiro Nome" value={userData[0].firstname} />
        <MedicalItem label="Último Nome" value={userData[0].lastname} />
        <MedicalItem label="Username" value={userData[0].username} />
        <MedicalItem label="Email" value={userData[0].email} />
        <MedicalItem label="Status" value={userData[0].role} />

        <Section
          onPress={() => router.push("/EditProfileInfo")}
          title="Dados Adicionais"
        />

        <MedicalItem
          label="Idade"
          value={
            String(
              new Date().getFullYear() -
                Number(profileData[0].birthday.slice(0, 4)),
            ) +
            " " +
            "Anos"
          }
        />
        <MedicalItem
          label="Sexo"
          value={profileData[0].gender === "M" ? "Masculino" : "Feminino"}
        />
        <MedicalItem
          label="Endereço"
          value={`Província: ${profileData[0].address.province} / Município: ${profileData[0].address.municipy}, Bairro: ${profileData[0].address.neighbourhood}`}
        />

        {/* DIABETES */}
        <Section
          onPress={() => router.push("/EditDiabeteInfo")}
          title="Dados da Diabete"
        />

        <MedicalItem
          label="Tipo"
          value={"Diabete " + diabeteData[0].diabetiType}
        />
        <MedicalItem
          label="Diagnósticado Em"
          value={diabeteData[0].diagnosisYear.slice(0, 4)}
        />
        <MedicalItem
          label="Estado da Diabete"
          value={diabeteData[0].currentStatus}
        />
        <MedicalItem
          label="HyperGlicemia(Último Registo)"
          value={diabeteData[0].hyperGlycemiaFrequency}
        />
        <MedicalItem
          label="HyporGlicemia(Último Registo)"
          value={diabeteData[0].hypoGlycemiaFrequency}
        />

        <MedicalItem
          label="Glucode em Jejum(Último Registo)"
          value={diabeteData[0].lastFastingGlucose + " mg/dL"}
        />

        <MedicalItem
          label="HbA1c Alvo"
          value={diabeteData[0].lastHba1c + "%"}
        />

        {/* METAS */}
        <Section
          onPress={() => router.push("/EditClinicalInfo")}
          title="Dados Corporais"
        />

        <MedicalItem
          label="Altura"
          value={clinicalData[0].height.toString() + "cm"}
        />
        <MedicalItem
          label="Peso"
          value={clinicalData[0].weight.toString() + "kg"}
        />
        <MedicalItem
          label="Cálculo de Índice de massa corporal"
          value={clinicalData[0].bmi.toString()}
        />
        <MedicalItem
          label="Nível de Atividade Física"
          value={clinicalData[0].physicalActivityLevel}
        />
      </ScrollView>
    </View>
  );
}

/* ===================== COMPONENTES ===================== */
function Section({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-4">
      <Text className="text-lg font-semibold text-primary">{title}</Text>
      <Ionicons
        onPress={onPress}
        name="create-outline"
        size={22}
        color="#0A6B49"
      />
    </View>
  );
}

function MedicalItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-2">
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <Text className="text-base text-gray-600">{value}</Text>
    </View>
  );
}
