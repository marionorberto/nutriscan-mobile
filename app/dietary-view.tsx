import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DietaryView() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-white border border-zinc-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-zinc-900">
          Dietary intelligence
        </Text>

        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={22} color="#52525b" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View className="px-6 mt-4">
          <View className="bg-white rounded-3xl border border-zinc-200 p-6">
            <Text className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Padrão alimentar
            </Text>

            <Text className="text-3xl font-extrabold text-zinc-900 mb-3">
              Regular
            </Text>

            <View className="flex-row justify-between">
              <Metric label="Refeições/dia" value="3" />
              <Metric label="Constância" value="Boa" />
              <Metric label="Score" value="82%" highlight />
            </View>
          </View>
        </View>

        {/* SECTION */}
        <Section title="Preferências">
          <Row label="Cultura alimentar" value="Angolana" />
          <Row label="Estilo" value="Caseira" />
          <Row label="Restrições" value="Nenhuma" />
        </Section>

        {/* SECTION */}
        <Section title="Alimentos mais recorrentes">
          {["Arroz", "Peixe grelhado", "Legumes", "Banana"].map((item) => (
            <View
              key={item}
              className="flex-row items-center justify-between py-4 border-b border-zinc-100"
            >
              <Text className="text-base text-zinc-800">{item}</Text>
              <Icon name="chevron-forward" size={18} color="#A1A1AA" />
            </View>
          ))}
        </Section>

        {/* INSIGHT */}
        <View className="px-6 mt-6">
          <View className="bg-[#F0FDF7] border border-[#D9F8E5] rounded-2xl p-5">
            <Text className="text-sm text-zinc-700 mb-1">
              Insight nutricional
            </Text>
            <Text className="text-base font-medium text-zinc-900">
              O teu padrão alimentar contribui para estabilidade glicêmica.
            </Text>
            <Text className="text-sm text-[#0A6B49] mt-2">
              ✔ Continuidade recomendada
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* COMPONENTES */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="px-6 mt-10">
    <Text className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
      {title}
    </Text>
    <View className="bg-white border border-zinc-200 rounded-2xl px-5">
      {children}
    </View>
  </View>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-4 border-b border-zinc-100">
    <Text className="text-sm text-zinc-600">{label}</Text>
    <Text className="text-sm font-medium text-zinc-900">{value}</Text>
  </View>
);

const Metric = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <View>
    <Text className="text-xs text-zinc-500 mb-1">{label}</Text>
    <Text
      className={`text-lg font-bold ${
        highlight ? "text-[#0A6B49]" : "text-zinc-900"
      }`}
    >
      {value}
    </Text>
  </View>
);
