import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { updateClinicalInfo } from "@/src/services/profile/updateClinicalInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface IClinicalData {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  physicalActivityLevel: string;
  createdAt: string;
  updatedAt: string;
}

const activityLevels = [
  { label: "Sedentário", value: "SEDENTARY" },
  { label: "Moderado", value: "MODERATE" },
  { label: "Ativo", value: "ACTIVE" },
];

export default function EditClinicalScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const [clinicalData, setClinicalData] = useState<IClinicalData | null>(null);

  useEffect(() => {
    fetchClinicalData();
  }, []);

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/clinical-profiles/one`);
      setClinicalData(response.data.data);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar os dados clínicos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!clinicalData) return;
    try {
      setLoading(true);
      await updateClinicalInfo(clinicalData);
      Alert.alert("Sucesso", "Dados clínicos atualizados!");
      router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !clinicalData) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  if (!clinicalData) return null;

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
        <Text className="text-2xl font-bold text-primary">Dados Clínicos</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Medidas Corporais" />

        <MedicalItem
          label="Altura (cm)"
          keyboardType="numeric"
          value={clinicalData.height?.toString()}
          onChangeText={(text) =>
            setClinicalData({ ...clinicalData, height: Number(text) })
          }
        />

        <MedicalItem
          label="Peso (kg)"
          keyboardType="numeric"
          value={clinicalData.weight?.toString()}
          onChangeText={(text) =>
            setClinicalData({ ...clinicalData, weight: Number(text) })
          }
        />

        <MedicalItem
          label="IMC (Cálculo Automático)"
          value={clinicalData.bmi.toString()}
          disabled={true}
        />

        <Section title="Estilo de Vida" />

        <TouchableOpacity
          onPress={() => setShowActivityPicker(!showActivityPicker)}
        >
          <MedicalItem
            label="Nível de Atividade Física"
            value={clinicalData.physicalActivityLevel}
            disabled={true}
          />
        </TouchableOpacity>

        {showActivityPicker && (
          <Picker
            selectedValue={clinicalData.physicalActivityLevel}
            onValueChange={(val) => {
              setClinicalData({ ...clinicalData, physicalActivityLevel: val });
              if (Platform.OS === "android") setShowActivityPicker(false);
            }}
            style={{ backgroundColor: "#f4f4f5", marginBottom: 15 }}
          >
            {activityLevels.map((lvl) => (
              <Picker.Item
                key={lvl.value}
                label={lvl.label}
                value={lvl.value}
              />
            ))}
          </Picker>
        )}

        {/* CTA */}
        <View className="mt-10 pb-10">
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            className={`py-4 rounded-2xl items-center ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
          >
            <Text className="text-white font-bold text-xl">
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ===================== COMPONENTES REUTILIZADOS ===================== */

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
  disabled = false,
  keyboardType,
  onChangeText,
}: {
  label: string;
  value: string | undefined;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <TextInput
        value={value}
        editable={!disabled}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        className={`border rounded-2xl p-4 mb-2 ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      />
    </View>
  );
}

// import { API_URL } from "@/src/constants/data";
// import api from "@/src/services/api";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export interface IUserData {
//   id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   email: string;
//   img: string;
//   role: string;
//   associatedCondition: {
//     id: string;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
//   }[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IClinicalData {
//   id: string;
//   weight: number;
//   height: number;
//   bmi: number;
//   physicalActivityLevel: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function EditClinicalScreen() {
//   const router = useRouter();
//   const { userID }: { userID: string } = useLocalSearchParams();

//   const [loading, setLoading] = useState(true);

//   // //clinicalData
//   const [clinicalData, setClinicalData] = useState<IClinicalData[]>([]);

//   useEffect(() => {
//     fetchClinicalData();
//   }, []);

//   const handleSubmition = () => {
//     Alert.alert("ok");
//   };

//   // //clinicalData - FETCH
//   const fetchClinicalData = async () => {
//     try {
//       setLoading(true);

//       api
//         .get(`${API_URL}/clinical-profiles/one`)
//         .then(({ data: response }) => {
//           setClinicalData([response.data]);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     } catch (error: any) {
//       if (error.data) {
//         alert(`${error.message.map((error: string) => error)}`);
//       }
//       alert(`${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading || !clinicalData[0]) {
//     return (
//       <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
//     );
//   }

//   return (
//     <View className="flex-1 bg-white px-4">
//       {/* HEADER */}
//       <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
//         <Pressable
//           onPress={() => router.back()}
//           className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
//         >
//           <Ionicons name="chevron-back" size={22} color="#0A6B49" />
//         </Pressable>

//         <Text className="text-2xl font-bold text-primary">
//           Edite os seus Dados
//         </Text>
//       </View>
//       <View className="py-4">
//         <Text className="text-2xl font-bold text-primary">Dados a Editar</Text>
//         <Text className="text-sm text-gray-500 mt-1">
//           Analise bem cada campo antes de editar
//         </Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* METAS */}
//         <Section title="Corpo" />

//         <MedicalItem
//           label="Altura"
//           value={clinicalData[0].height.toString() + "cm"}
//         />
//         <MedicalItem
//           label="Peso"
//           value={clinicalData[0].weight.toString() + "kg"}
//         />
//         <MedicalItem
//           label="Cálculo de Índice de massa corporal"
//           value={clinicalData[0].bmi.toString()}
//         />
//         <MedicalItem
//           label="Nível de Atividade Física"
//           value={clinicalData[0].physicalActivityLevel}
//         />

//         {/* CTA */}
//         <View className="mt-auto pb-10 pt-10">
//           <TouchableOpacity
//             disabled={loading}
//             onPress={handleSubmition}
//             className={`py-4 rounded-2xl items-center shadow-sm ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text className="text-white font-bold text-xl">
//                 Salvar Alterações
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// /* ===================== COMPONENTES ===================== */

// function Section({ title }: { title: string }) {
//   return (
//     <Text className="text-lg font-semibold text-primary mt-4 mb-2">
//       {title}
//     </Text>
//   );
// }

// function MedicalItem({ label, value }: { label: string; value: string }) {
//   return (
//     <View>
//       <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
//       <TextInput
//         value={value}
//         className="bg-white border border-gray-200 rounded-2xl p-4 mb-2"
//       />
//     </View>
//   );
// }
