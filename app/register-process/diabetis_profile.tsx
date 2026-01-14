import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const diabetiTypes = [
  { label: "Tipo 1", value: "type1" },
  { label: "Tipo 2", value: "type2" },
  { label: "Gestacional", value: "gestational" },
  { label: "Pré-diabetes", value: "pre_diabetes" },
];

const frequencyOptions = ["Baixa", "Média", "Alta"];

const DiabetesProfileScreen = () => {
  const router = useRouter();

  const [diabetiType, setDiabetiType] = useState<string | null>(null);
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [currentStatus, setCurrentStatus] = useState<
    "controlled" | "uncontrolled" | null
  >(null);
  const [lastFastingGlucose, setLastFastingGlucose] = useState("");
  const [lastHba1c, setLastHba1c] = useState("");
  const [hypoGlycemiaFrequency, setHypoGlycemiaFrequency] = useState<
    string | null
  >(null);
  const [hyperGlycemiaFrequency, setHyperGlycemiaFrequency] = useState<
    string | null
  >(null);

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
          </Card>

          {/* currentSTATUS */}
          <Card title="Estado atual">
            <View className="flex-row gap-3">
              <Chip
                label="Controlada"
                selected={currentStatus === "controlled"}
                onPress={() => setCurrentStatus("controlled")}
              />
              <Chip
                label="Não controlada"
                selected={currentStatus === "uncontrolled"}
                onPress={() => setCurrentStatus("uncontrolled")}
              />
            </View>
          </Card>

          {/* DADOS CLÍNICOS */}
          <Card title="Dados recentes">
            <Input
              icon="calendar-outline"
              placeholder="Ano de diagnóstico (ex: 2018)"
              value={diagnosisYear}
              onChangeText={setDiagnosisYear}
              keyboardType="numeric"
            />

            <Input
              icon="water-outline"
              placeholder="Glicemia em jejum (mg/dL)"
              value={lastFastingGlucose}
              onChangeText={setLastFastingGlucose}
              keyboardType="numeric"
            />

            <Input
              icon="analytics-outline"
              placeholder="lastHba1c (%)"
              value={lastHba1c}
              onChangeText={setLastHba1c}
              keyboardType="decimal-pad"
            />
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
          </Card>
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => router.push("/register-process/dietary_routine")}
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
    <TextInput {...props} className="flex-1 px-3 py-4 text-base text-black" />
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
