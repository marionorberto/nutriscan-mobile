import { handleCreateDiabeteProfile } from "@/src/services/authService";
import Icon from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const diabetiTypes = [
  { label: "Tipo 1", value: "tipo1" },
  { label: "Tipo 2", value: "tipo2" },
  { label: "Gestacional", value: "gestational" },
  { label: "Pré-diabetes", value: "preDiabete" },
];

const frequencyOptions = ["baixa", "media", "alta"];

const DiabetesProfileScreen = () => {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [diabetiType, setDiabetiType] = useState<string>("");
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [currentStatus, setCurrentStatus] = useState<
    "controlado" | "descontrolado"
  >("controlado");
  const [lastFastingGlucose, setLastFastingGlucose] = useState("");
  const [lastHba1c, setLastHba1c] = useState("");
  const [hypoGlycemiaFrequency, setHypoGlycemiaFrequency] =
    useState<string>("");
  const [hyperGlycemiaFrequency, setHyperGlycemiaFrequency] =
    useState<string>("");

  const [errors, setErrors] = useState<{
    diabetiType?: string;
    currentStatus?: string;
    diagnosisYear?: string;
    lastFastingGlucose?: string;
    lastHba1c?: string;
    hypoGlycemiaFrequency?: string;
    hyperGlycemiaFrequency?: string;
  }>({});

  const validateDiabetesForm = () => {
    const newErrors: typeof errors = {};
    const currentYear = new Date().getFullYear();

    // TIPO DE DIABETES
    if (!diabetiType) {
      newErrors.diabetiType = "Selecione o tipo de diabetes";
    } else if (!diabetiTypes.map((t) => t.value).includes(diabetiType)) {
      newErrors.diabetiType = "Tipo de diabetes inválido";
    }

    // ESTADO ATUAL
    if (!currentStatus) {
      newErrors.currentStatus = "Selecione o estado atual";
    } else if (!["controlado", "descontrolado"].includes(currentStatus)) {
      newErrors.currentStatus = "Estado atual inválido";
    }

    // DADOS CLÍNICOS
    const year = Number(diagnosisYear);
    if (!diagnosisYear) {
      newErrors.diagnosisYear = "Ano de diagnóstico é obrigatório";
    } else if (isNaN(year) || year < 1950 || year > currentYear) {
      newErrors.diagnosisYear = `Ano inválido (1950–${currentYear})`;
    }

    const glucose = Number(lastFastingGlucose);
    if (!lastFastingGlucose) {
      newErrors.lastFastingGlucose = "Glicemia em jejum é obrigatória";
    } else if (isNaN(glucose) || glucose < 50 || glucose > 600) {
      newErrors.lastFastingGlucose =
        "Glicemia em jejum inválida (50–600 mg/dL)";
    }

    const hba1c = Number(lastHba1c);
    if (!lastHba1c) {
      newErrors.lastHba1c = "HbA1c é obrigatório";
    } else if (isNaN(hba1c) || hba1c < 3 || hba1c > 20) {
      newErrors.lastHba1c = "HbA1c inválido (3–20%)";
    }

    // FREQUÊNCIAS
    if (!hypoGlycemiaFrequency) {
      newErrors.hypoGlycemiaFrequency =
        "Selecione a frequência de hipoglicemia";
    } else if (!frequencyOptions.includes(hypoGlycemiaFrequency)) {
      newErrors.hypoGlycemiaFrequency = "Frequência inválida";
    }

    if (!hyperGlycemiaFrequency) {
      newErrors.hyperGlycemiaFrequency =
        "Selecione a frequência de hiperglicemia";
    } else if (!frequencyOptions.includes(hyperGlycemiaFrequency)) {
      newErrors.hyperGlycemiaFrequency = "Frequência inválida";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDiabetes = async () => {
    if (!validateDiabetesForm()) return;

    await handleCreateDiabeteProfile(
      diabetiType,
      currentStatus,
      diagnosisYear,
      Number(lastFastingGlucose),
      Number(lastHba1c),
      hypoGlycemiaFrequency,
      hyperGlycemiaFrequency,
      userID,
    );

    next();
  };

  const next = async () => {
    router.push({
      pathname: "/register-process/dietary_routine",
      params: {
        userID,
      },
    });
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* HEADER */}
      <View className="mb-8">
        <Text className="text-sm text-[#24B370] font-semibold mb-2">
          Passo 5 de 6
        </Text>

        <Text className="text-3xl font-extrabold text-[#0a6b49]">
          Perfil de diabetes
        </Text>

        <Text className="text-zinc-600 mt-2 text-base leading-6">
          Estas informações ajudam-nos a monitorar e prevenir riscos.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          {/* TIPO DE DIABETES */}
          <Card title="Tipo de diabetes">
            <View className="flex-row flex-wrap gap-3">
              {diabetiTypes.map((item) => (
                <Chip
                  key={item.value}
                  label={item.label}
                  selected={diabetiType === item.value}
                  onPress={() => setDiabetiType(item.value)}
                />
              ))}
            </View>

            {errors.diabetiType && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.diabetiType}
              </Text>
            )}
          </Card>

          {/* currentSTATUS */}
          <Card title="Estado atual">
            <View className="flex-row gap-3">
              <Chip
                label="Controlada"
                selected={currentStatus === "controlado"}
                onPress={() => setCurrentStatus("controlado")}
              />
              <Chip
                label="Não controlada"
                selected={currentStatus === "descontrolado"}
                onPress={() => setCurrentStatus("descontrolado")}
              />
            </View>
            {errors.currentStatus && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.currentStatus}
              </Text>
            )}
          </Card>

          {/* DADOS CLÍNICOS */}
          <Card title="Dados recentes">
            <Text className="text-start font-bold">Ano de Diagnóstico</Text>
            <Picker
              style={{ backgroundColor: "#fff" }}
              selectedValue={diagnosisYear}
              onValueChange={(year) => setDiagnosisYear(year)}
            >
              {Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).map(
                (year) => (
                  <Picker.Item
                    key={year}
                    label={year.toString()}
                    value={year}
                  />
                ),
              )}
            </Picker>

            {errors.diagnosisYear && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.diagnosisYear}
              </Text>
            )}

            <Input
              icon="water-outline"
              placeholder="Glicemia em jejum (mg/dL)"
              value={lastFastingGlucose}
              onChangeText={setLastFastingGlucose}
              keyboardType="numeric"
            />

            {errors.lastFastingGlucose && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.lastFastingGlucose}
              </Text>
            )}

            <Input
              icon="analytics-outline"
              placeholder="lastHba1c (%)"
              value={lastHba1c}
              onChangeText={setLastHba1c}
              keyboardType="decimal-pad"
            />

            {errors.lastHba1c && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.lastHba1c}
              </Text>
            )}
          </Card>

          {/* FREQUÊNCIAS */}
          <Card title="Frequência de episódios">
            <Text className="text-sm text-zinc-600 mb-2">Hipoglicemia</Text>
            <View className="flex-row gap-3 mb-4">
              {frequencyOptions.map((f) => (
                <Chip
                  key={`hypo-${f}`}
                  label={f}
                  selected={hypoGlycemiaFrequency === f}
                  onPress={() => setHypoGlycemiaFrequency(f)}
                />
              ))}
            </View>
            {errors.hypoGlycemiaFrequency && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.hypoGlycemiaFrequency}
              </Text>
            )}
            <Text className="text-sm text-zinc-600 mb-2">Hiperglicemia</Text>
            <View className="flex-row gap-3">
              {frequencyOptions.map((f) => (
                <Chip
                  key={`hyper-${f}`}
                  label={f}
                  selected={hyperGlycemiaFrequency === f}
                  onPress={() => setHyperGlycemiaFrequency(f)}
                />
              ))}
            </View>

            {errors.hyperGlycemiaFrequency && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.hyperGlycemiaFrequency}
              </Text>
            )}
          </Card>
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            handleSubmitDiabetes();
          }}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* COMPONENTES AUXILIARES */

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="bg-zinc-100 rounded-3xl p-5 gap-4">
    <Text className="text-base font-semibold text-zinc-800">{title}</Text>
    {children}
  </View>
);

const Input = ({ icon, value, onChangeText, ...props }: any) => (
  <View className="flex-row items-center bg-white rounded-2xl px-4 border border-zinc-200">
    <Icon name={icon} size={20} color="#52525b" />
    <TextInput
      onChangeText={onChangeText}
      value={value}
      {...props}
      className="flex-1 px-3 py-4 text-base text-black"
    />
  </View>
);

const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border ${
      selected ? "bg-[#24B370] border-[#24B370]" : "bg-white border-zinc-300"
    }`}
  >
    <Text
      className={`text-sm font-medium ${
        selected ? "text-white" : "text-zinc-700"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default DiabetesProfileScreen;
