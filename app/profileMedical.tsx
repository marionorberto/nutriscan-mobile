import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function MedicalProfileScreen() {
  const router = useRouter();
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
        <Text className="text-2xl font-bold text-primary">Dados Médicos</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Informações clínicas do paciente
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IDENTIFICAÇÃO */}
        <Section title="Identificação do paciente" />

        <MedicalItem label="Nome" value="Mário Norberto" />
        <MedicalItem label="Idade" value="24 anos" />
        <MedicalItem label="Sexo" value="Masculino" />

        {/* DIABETES */}
        <Section title="Diabetes" />

        <MedicalItem label="Tipo" value="Diabetes Tipo 2" />
        <MedicalItem label="Data de diagnóstico" value="2022" />
        <MedicalItem label="Tratamento atual" value="Dieta + Metformina" />

        {/* METAS */}
        <Section title="Metas clínicas" />

        <MedicalItem label="Glicemia em jejum" value="80 – 130 mg/dL" />
        <MedicalItem label="Pós-prandial" value="< 180 mg/dL" />
        <MedicalItem label="HbA1c alvo" value="< 7%" />

        {/* OBSERVAÇÕES */}
        <Section title="Observações" />

        <View className="bg-soft rounded-2xl p-4 mb-10">
          <Text className="text-sm text-primary">
            Paciente apresenta boa adesão alimentar. Manter monitorização
            contínua.
          </Text>
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

function MedicalItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-2">
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <Text className="text-base text-gray-600">{value}</Text>
    </View>
  );
}
