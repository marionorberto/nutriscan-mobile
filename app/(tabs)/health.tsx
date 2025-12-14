import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { Pressable, ScrollView, Text, View } from "react-native";

export default function HealthScreen() {
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
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">Saúde</Text>
      </View>
      <View className="mt-6 mb-6">
        <Text className="text-2xl font-semibold text-primary">Saúde</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Visão geral do seu estado
        </Text>
      </View>

      {/* STATUS ATUAL */}
      <View className="bg-[#D9F8E5] rounded-3xl p-5 mb-6 border border-[#24B370]/30">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-medium text-[#0a6b49]">
            Status de hoje
          </Text>

          <View className="flex-row items-center gap-1 bg-[#24B370]/20 px-3 py-1 rounded-full">
            <Icon name="pulse-outline" size={14} color="#0a6b49" />
            <Text className="text-xs font-semibold text-[#0a6b49]">Normal</Text>
          </View>
        </View>

        <Text className="text-4xl font-extrabold text-[#0a6b49] mb-2">
          Estável
        </Text>

        <Text className="text-sm text-[#0a6b49]/80">
          Glicemia dentro do intervalo ideal nas últimas horas.
        </Text>
      </View>

      {/* INDICADORES */}
      <Text className="text-lg font-semibold text-primary mb-4">
        Indicadores principais
      </Text>

      <View className="flex-row justify-between mb-6">
        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">112</Text>
          <Text className="text-xs text-gray-500 mt-1 text-center">
            Glicemia média
          </Text>
        </View>

        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">Baixo</Text>
          <Text className="text-xs text-gray-500 mt-1 text-center">
            Índice glicêmico
          </Text>
        </View>

        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">87%</Text>
          <Text className="text-xs text-gray-500 mt-1 text-center">
            Aderência
          </Text>
        </View>
      </View>

      {/* TENDÊNCIA */}
      <Text className="text-lg font-semibold text-primary mb-3">
        Tendência glicêmica
      </Text>

      <View className="bg-white border border-zinc-200 rounded-3xl p-5 mb-6">
        {/* STATUS */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-base font-semibold text-primary">
            Últimos dias
          </Text>

          <View className="flex-row items-center gap-1 bg-[#D9F8E5] px-3 py-1 rounded-full">
            <Icon name="trending-up-outline" size={14} color="#0a6b49" />
            <Text className="text-xs font-medium text-primary">Estável</Text>
          </View>
        </View>

        {/* DESCRIÇÃO */}
        <Text className="text-sm text-zinc-600 mb-4">
          Seus níveis glicêmicos permaneceram dentro do intervalo ideal nos
          últimos dias, indicando boa adaptação alimentar.
        </Text>

        {/* FEEDBACK */}
        <View className="flex-row items-center gap-2 bg-soft rounded-xl p-3">
          <Icon name="checkmark-circle-outline" size={18} color="#24B370" />
          <Text className="text-sm font-medium text-secondary">
            Boa resposta alimentar
          </Text>
        </View>
      </View>

      {/* RECOMENDAÇÕES */}
      <Text className="text-lg font-semibold text-primary mb-3">
        Recomendações de hoje
      </Text>

      <View className="bg-soft rounded-3xl p-5 mb-10">
        {/* ITEM 1 */}
        <View className="flex-row items-start gap-3 mb-3">
          <View className="bg-[#24B370]/20 p-2 rounded-full">
            <Icon name="leaf-outline" size={16} color="#0a6b49" />
          </View>
          <Text className="text-sm text-primary flex-1">
            Priorize alimentos ricos em fibras no almoço.
          </Text>
        </View>

        {/* ITEM 2 */}
        <View className="flex-row items-start gap-3 mb-4">
          <View className="bg-[#24B370]/20 p-2 rounded-full">
            <Icon name="moon-outline" size={16} color="#0a6b49" />
          </View>
          <Text className="text-sm text-primary flex-1">
            Evite refeições com alto índice glicêmico à noite.
          </Text>
        </View>

        {/* FEEDBACK POSITIVO */}
        <View className="flex-row items-center gap-2 bg-white rounded-xl p-3">
          <Icon name="checkmark-circle-outline" size={18} color="#24B370" />
          <Text className="text-sm font-medium text-secondary">
            Continue monitorando suas refeições diariamente.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
