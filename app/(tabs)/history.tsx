import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MealsScreen() {
  const router = useRouter();
  return (
    <ScrollView
      className="flex-1 bg-white px-5"
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">Refeições</Text>
      </View>
      <View className="mt-6 mb-6">
        <Text className="text-2xl font-semibold text-primary">Refeições</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Terça-feira, 10 Dezembro
        </Text>
      </View>

      {/* RESUMO DO DIA */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-[#0a6b49] mb-4">
          Resumo do dia
        </Text>

        {/* CALORIAS */}
        <View className="bg-[#D9F8E5] rounded-2xl p-5 mb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-sm text-[#0a6b49]/70">
                Calorias consumidas
              </Text>
              <Text className="text-2xl font-extrabold text-[#0a6b49]">
                820 kcal
              </Text>
            </View>

            <View className="bg-white p-3 rounded-xl">
              <Ionicons name="flame-outline" size={26} color="#0a6b49" />
            </View>
          </View>

          {/* Progress bar fake */}
          <View className="mt-4 h-2 rounded-full bg-white/60 overflow-hidden">
            <View className="h-full w-[41%] bg-[#0a6b49]" />
          </View>

          <Text className="mt-2 text-xs text-[#0a6b49]/70">
            820 de 2000 kcal
          </Text>
        </View>

        {/* MACROS */}
        <View className="flex-row gap-4">
          {/* CARBO */}
          <View className="flex-1 bg-white border border-[#D9F8E5] rounded-2xl p-4">
            <Text className="text-sm text-zinc-500">Carboidratos</Text>
            <Text className="text-xl font-bold text-[#0a6b49] mt-1">45g</Text>
            <Text className="text-xs text-zinc-400 mt-1">de 120g</Text>
          </View>

          {/* IG */}
          <View className="flex-1 bg-white border border-[#D9F8E5] rounded-2xl p-4">
            <Text className="text-sm text-zinc-500">Índice glicêmico</Text>
            <Text className="text-xl font-bold text-[#24B370] mt-1">Baixo</Text>
            <Text className="text-xs text-zinc-400 mt-1">Média do dia</Text>
          </View>
        </View>
      </View>

      {/* AÇÃO RÁPIDA */}
      <TouchableOpacity className="bg-[#0a6b49] rounded-3xl p-5 mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-white text-lg font-extrabold">
            Nova refeição
          </Text>
          <Text className="text-[#D9F8E5] text-sm mt-1">
            Adicione manualmente ou por foto
          </Text>
        </View>

        <View className="bg-white/20 p-3 rounded-2xl">
          <Ionicons name="add-outline" size={28} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* CAFÉ DA MANHÃ */}
      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold text-primary">
            ☀️ Café da manhã
          </Text>
          <Text className="text-xs text-gray-500">08:40</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Banana</Text>
          <Text className="text-sm font-semibold text-primary">23g carb</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Iogurte natural</Text>
          <Text className="text-sm font-semibold text-primary">6g carb</Text>
        </View>

        <Text className="text-sm font-medium text-secondary mt-2">
          ✔ Baixo impacto glicêmico
        </Text>
      </View>

      {/* ALMOÇO */}
      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold text-primary">
            🍽 Almoço
          </Text>
          <Text className="text-xs text-gray-500">13:10</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Arroz branco</Text>
          <Text className="text-sm font-semibold text-primary">52g carb</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Frango grelhado</Text>
          <Text className="text-sm font-semibold text-primary">0g carb</Text>
        </View>

        <Text className="text-sm font-medium text-red-600 mt-2">
          ⚠ Impacto glicêmico elevado
        </Text>
      </View>

      {/* JANTAR */}
      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold text-primary">
            🌙 Jantar
          </Text>
          <Text className="text-xs text-gray-500">—</Text>
        </View>

        <Text className="text-sm text-gray-500">
          Nenhuma refeição registrada
        </Text>
      </View>

      {/* INSIGHTS */}
      <Text className="text-lg font-bold text-[#0a6b49] mb-3">
        Insights & alertas
      </Text>

      <View className="bg-[#D9F8E5] rounded-2xl p-4 mb-10 border border-[#24B370]/30">
        <View className="flex-row items-start gap-3">
          <View className="bg-[#24B370]/20 p-2 rounded-xl">
            <Ionicons name="alert-circle-outline" size={22} color="#0a6b49" />
          </View>

          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#0a6b49] mb-1">
              Atenção ao almoço
            </Text>

            <Text className="text-sm text-[#0a6b49]/90 mb-2">
              A refeição teve carga glicêmica elevada.
            </Text>

            <Text className="text-sm font-medium text-[#24B370]">
              💡 Sugestão: combine carboidratos com fibras ou proteínas.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
