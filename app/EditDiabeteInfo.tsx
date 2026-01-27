import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { updateDiabeteInfo } from "@/src/services/profile/updateDiabeteInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const diabetiTypes = [
  { label: "Tipo 1", value: "tipo1" },
  { label: "Tipo 2", value: "tipo2" },
  { label: "Gestacional", value: "gestational" },
  { label: "Pré-diabetes", value: "preDiabete" },
];

const frequencyOptions = ["baixa", "media", "alta"];
const current = ["controlado", "descontrolado"];

export default function EditDiabeteScreen() {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false); // ...
  const [showHyperPicker, setShowHyperPicker] = useState(false); // ...
  const [showHypoPicker, setShowHypoPicker] = useState(false); // ...
  const [showStatusPicker, setShowStatusPicker] = useState(false); // ...

  const [loading, setLoading] = useState(true);

  const [diabeteData, setDiabeteData] = useState<IDiabeteData | null>(null);

  useEffect(() => {
    fetchDiabeteData();
  }, []);

  const fetchDiabeteData = async () => {
    try {
      setLoading(true);
      // Usando await corretamente para o try/catch funcionar
      const response = await api.get(
        `${API_URL}/diabete-profiles/diabete-profile`,
      );
      setDiabeteData(response.data.data);
    } catch (error: any) {
      console.error("Erro no profile page:", error);
      Alert.alert("Ops!", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!diabeteData) return;

    try {
      setLoading(true);
      await updateDiabeteInfo(diabeteData);
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

  if (loading && !diabeteData) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  // Se não houver diabeteData, evita crash ao tentar acessar propriedades
  if (!diabeteData) return null;

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
        {/* DIABETES */}
        <Section title="Dados da Diabete" />
        <TouchableOpacity onPress={() => setShowTypePicker(!showTypePicker)}>
          <MedicalItem
            label="Tipo de Diabetes"
            // Exibe o valor formatado ou um aviso caso esteja vazio
            value={
              diabeteData.diabetiType
                ? `Diabete ${diabeteData.diabetiType}`
                : "Selecione o tipo"
            }
            disabled={true}
          />
        </TouchableOpacity>
        {showTypePicker && (
          <Picker
            style={{
              backgroundColor: "rgb(228 228 231 / 0.8)",
              color: "#52525b",
              marginBottom: 15,
              borderRadius: 12, // Nota: 'className' em Pickers às vezes falha, o estilo direto é mais seguro
            }}
            selectedValue={diabeteData.diabetiType}
            onValueChange={(itemValue) => {
              setDiabeteData({ ...diabeteData, diabetiType: itemValue });
              // No Android, é melhor fechar após selecionar. No iOS, o usuário clica fora ou num "Done".
              if (Platform.OS === "android") setShowTypePicker(false);
            }}
          >
            {/* Dica: Adicione um item padrão nulo se desejar */}
            {diabetiTypes.map((item) => (
              <Picker.Item
                label={item.label || item.value} // Use label para o texto e value para o dado
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
        )}

        <TouchableOpacity onPress={() => setShowYearPicker(!showYearPicker)}>
          <MedicalItem
            label="Diagnosticado Em"
            disabled={true} // Mantém disabled para o usuário não digitar, mas o Touchable envolve a ação
            value={diabeteData.diagnosisYear?.toString()}
          />
        </TouchableOpacity>
        {showYearPicker && (
          <Picker
            selectedValue={diabeteData.diagnosisYear}
            onValueChange={(year) => {
              setDiabeteData({ ...diabeteData, diagnosisYear: year });
              if (Platform.OS === "android") setShowYearPicker(false); // Fecha no Android após selecionar
            }}
            style={{
              backgroundColor: "rgb(228 228 231 / 0.8)",
              color: "#52525b",
            }}
          >
            {Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).map(
              (year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ),
            )}
          </Picker>
        )}

        <TouchableOpacity
          onPress={() => setShowStatusPicker(!showStatusPicker)}
        >
          <MedicalItem
            label="Estado da Diabete"
            // Exibe o valor formatado ou um aviso caso esteja vazio
            value={
              diabeteData.currentStatus
                ? `Diabete ${diabeteData.currentStatus}`
                : "Selecione o Estado"
            }
            disabled={true}
          />
        </TouchableOpacity>

        {showStatusPicker && (
          <Picker
            style={{
              backgroundColor: "rgb(228 228 231 / 0.8)",
              color: "#52525b",
              marginBottom: 15,
              borderRadius: 12, // Nota: 'className' em Pickers às vezes falha, o estilo direto é mais seguro
            }}
            selectedValue={diabeteData.currentStatus}
            onValueChange={(itemValue) => {
              setDiabeteData({ ...diabeteData, currentStatus: itemValue });
              // No Android, é melhor fechar após selecionar. No iOS, o usuário clica fora ou num "Done".
              if (Platform.OS === "android") setShowStatusPicker(false);
            }}
          >
            {/* Dica: Adicione um item padrão nulo se desejar */}
            {current.map((item) => (
              <Picker.Item
                label={item} // Use label para o texto e value para o dado
                value={item}
                key={item}
              />
            ))}
          </Picker>
        )}

        {/* <MedicalItem
          label="HyperGlicemia(Último Registo)"
          value={diabeteData.hyperGlycemiaFrequency}
        /> */}
        <TouchableOpacity onPress={() => setShowHyperPicker(!showHyperPicker)}>
          <MedicalItem
            label="HyperGlicemia(Último Registo)"
            // Exibe o valor formatado ou um aviso caso esteja vazio
            value={diabeteData.hyperGlycemiaFrequency}
            disabled={true}
          />
        </TouchableOpacity>

        {showHyperPicker && (
          <Picker
            style={{
              backgroundColor: "rgb(228 228 231 / 0.8)",
              color: "#52525b",
              marginBottom: 15,
              borderRadius: 12, // Nota: 'className' em Pickers às vezes falha, o estilo direto é mais seguro
            }}
            selectedValue={diabeteData.hyperGlycemiaFrequency}
            onValueChange={(itemValue) => {
              setDiabeteData({
                ...diabeteData,
                hyperGlycemiaFrequency: itemValue,
              });
              // No Android, é melhor fechar após selecionar. No iOS, o usuário clica fora ou num "Done".
              if (Platform.OS === "android") setShowHyperPicker(false);
            }}
          >
            {/* Dica: Adicione um item padrão nulo se desejar */}
            {frequencyOptions.map((item) => (
              <Picker.Item
                label={item} // Use label para o texto e value para o dado
                value={item}
                key={item}
              />
            ))}
          </Picker>
        )}

        <TouchableOpacity onPress={() => setShowHypoPicker(!showHypoPicker)}>
          <MedicalItem
            label="HypoGlicemia(Último Registo)"
            // Exibe o valor formatado ou um aviso caso esteja vazio
            value={diabeteData.hypoGlycemiaFrequency}
            disabled={true}
          />
        </TouchableOpacity>

        {showHypoPicker && (
          <Picker
            style={{
              backgroundColor: "rgb(228 228 231 / 0.8)",
              color: "#52525b",
              marginBottom: 15,
              borderRadius: 12, // Nota: 'className' em Pickers às vezes falha, o estilo direto é mais seguro
            }}
            selectedValue={diabeteData.hypoGlycemiaFrequency}
            onValueChange={(itemValue) => {
              setDiabeteData({
                ...diabeteData,
                hypoGlycemiaFrequency: itemValue,
              });
              // No Android, é melhor fechar após selecionar. No iOS, o usuário clica fora ou num "Done".
              if (Platform.OS === "android") setShowHypoPicker(false);
            }}
          >
            {/* Dica: Adicione um item padrão nulo se desejar */}
            {frequencyOptions.map((item) => (
              <Picker.Item
                label={item} // Use label para o texto e value para o dado
                value={item}
                key={item}
              />
            ))}
          </Picker>
        )}

        <MedicalItem
          label="Glicose em Jejum (mg/dL)" // Unidade aqui
          keyboardType="numeric"
          value={diabeteData.lastFastingGlucose} // Apenas o valor puro: "110"
          onChangeText={(text: string) => {
            // Garante que apenas números sejam salvos
            const cleaned = text.replace(/[^0-9]/g, "");
            setDiabeteData({ ...diabeteData, lastFastingGlucose: cleaned });
          }}
        />

        <MedicalItem
          label="HbA1c Alvo (%)" // <-- Coloque a unidade no label
          keyboardType="numeric"
          // Mostra apenas o número no input para não atrapalhar a digitação
          value={diabeteData.lastHba1c?.toString() || ""}
          onChangeText={(text: string) => {
            // Remove qualquer caractere que não seja número ou ponto/vírgula
            const cleanedText = text.replace(/[^0-9.]/g, "");
            setDiabeteData({ ...diabeteData, lastHba1c: Number(cleanedText) });
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
  disabled = false,
  keyboardType, // O TS agora saberá que isso é um KeyboardTypeOptions
  onChangeText,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions; // <-- Mude de string para KeyboardTypeOptions
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
        className={`bg-white border border-gray-200 rounded-2xl p-4 mb-2 ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400"
            : "bg-white border-gray-200"
        }`}
      />
    </View>
  );
}
