import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanHistoryScreen() {
  const router = useRouter();

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

        <Text className="text-2xl font-bold text-primary">
          Histórico de scans
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* RESUMO */}
        <View className="bg-[#F1F5F3] rounded-3xl p-5 mt-4 mb-6">
          <Text className="text-sm font-medium text-zinc-600 mb-1">
            Últimos 7 dias
          </Text>

          <View className="flex-row justify-between mt-4">
            <SummaryItem icon="scan-outline" label="Scans" value="12" />
            <SummaryItem
              icon="alert-circle-outline"
              label="Carga alta"
              value="4"
            />
            <SummaryItem icon="leaf-outline" label="Baixa" value="6" />
          </View>
        </View>

        {/* FILTRO */}
        <View className="flex-row gap-3 mb-6">
          <FilterChip label="Hoje" active />
          <FilterChip label="7 dias" />
          <FilterChip label="30 dias" />
        </View>

        {/* LISTA */}
        <View className="gap-4 pb-10">
          <ScanCard
            food="Arroz + Feijão + Frango"
            time="Hoje • 13:20"
            calories={420}
            glycemic="Alta"
            type="warning"
          />

          <ScanCard
            food="Banana + Aveia"
            time="Hoje • 09:10"
            calories={210}
            glycemic="Baixa"
            type="good"
          />

          <ScanCard
            food="Pão branco com manteiga"
            time="Ontem • 20:45"
            calories={320}
            glycemic="Média"
            type="neutral"
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* COMPONENTS */

const SummaryItem = ({ icon, label, value }: any) => (
  <View className="items-center gap-1">
    <View className="bg-white p-2 rounded-full shadow-sm mb-1">
      <Icon name={icon} size={18} color="#0A6B49" />
    </View>
    <Text className="text-lg font-bold text-primary">{value}</Text>
    <Text className="text-xs text-zinc-500">{label}</Text>
  </View>
);

const FilterChip = ({ label, active }: any) => (
  <TouchableOpacity
    className={`px-4 py-2 rounded-full border ${
      active ? "bg-[#0A6B49] border-[#0A6B49]" : "bg-white border-zinc-300"
    }`}
  >
    <Text
      className={`text-sm font-medium ${
        active ? "text-white" : "text-zinc-600"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const ScanCard = ({ food, time, calories, glycemic, type }: any) => {
  const tone =
    type === "good"
      ? "bg-[#ECFDF5] text-secondary"
      : type === "warning"
        ? "bg-[#fee2e2] text-orange-600"
        : "bg-[#FFF7ED] text-zinc-600";

  return (
    <TouchableOpacity className="bg-white rounded-3xl p-5 shadow-sm border-zinc-200/50 border-[1px]">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-primary">{food}</Text>
        <Icon name="chevron-forward" size={18} color="#9ca3af" />
      </View>

      <Text className="text-xs text-zinc-500 mb-3">{time}</Text>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Icon name="flame-outline" size={14} color="#71717a" />
          <Text className="text-sm text-zinc-600">{calories} kcal</Text>
        </View>

        <View className={`px-3 py-1 rounded-full ${tone}`}>
          <Text className="text-xs font-medium">Carga {glycemic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
