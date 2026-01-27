import { useScanStore } from "@/src/store/useScanStore";
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

// Tipagem baseada no seu contrato        salmos 27:1 18:3
interface IEvaluation {
  analysisSummary: {
    overallSafetyStatus: "GREEN" | "YELLOW" | "RED";
    totalCarbsScanned: number;
  };
  foodItemsEvaluated: {
    name: string;
    isSafeForAllergies: boolean;
    glycemicImpact: "LOW" | "MEDIUM" | "HIGH";
    recommendation: string;
    nutritionalInfo: {
      calories: number;
      carbs: number;
      sugar: number;
      fiber: number;
      protein: number;
      fat: number;
    };
  }[];
  finalMedicalVerdict: {
    isRecommended: boolean;
    title: string;
    reason: string;
    suggestedPortion: string;
    alternatives: string[];
  };
  foodItemNutritionalInfoTotal: {
    calories: number;
    carbs: number;
    sugar: number;
    fiber: number;
    protein: number;
    fat: number;
  };
}

export default function EvaluationResultScreen() {
  const router = useRouter();
  const evaluationT = useScanStore((state) => state.evaluationT);

  const evaluation: IEvaluation = evaluationT;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "GREEN":
        return { color: "#24B370", bg: "#D9F8E5", icon: "checkmark-circle" };
      case "YELLOW":
        return { color: "#EAB308", bg: "#FEF9C3", icon: "warning" };
      case "RED":
        return { color: "#EF4444", bg: "#FEE2E2", icon: "close-circle" };
      default:
        return { color: "#0A6B49", bg: "#D9F8E5", icon: "help-circle" };
    }
  };

  const glycemicLabels = {
    LOW: "Baixo",
    MEDIUM: "Médio",
    HIGH: "Alto",
  };

  const status = getStatusConfig(
    evaluation.analysisSummary.overallSafetyStatus,
  );

  if (!evaluationT) {
    return <Text>Nenhum dado encontrado.</Text>;
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="px-5 pt-4 flex-row items-center gap-4 border-b-2 border-zinc-100 pb-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>
        <Text className="text-xl font-bold text-primary">
          Resultado da Análise
        </Text>
      </View>

      {/* CARD DE VERDITO PRINCIPAL (O "BOOM") */}
      {/* <View
        style={{ backgroundColor: status.bg }}
        className="mx-5 mt-6 p-6 rounded-[32px] items-center border border-black/5"
      >
        <View
          style={{ backgroundColor: "white" }}
          className="p-3 rounded-full mb-4 shadow-sm"
        >
          <Icon name={status.icon as any} size={48} color={status.color} />
        </View>

        <Text
          style={{ color: status.color }}
          className="text-2xl font-black text-center mb-2"
        >
          {evaluation.finalMedicalVerdict.title}
        </Text>

        <Text className="text-zinc-700 text-center leading-5 font-medium px-2">
          {evaluation.finalMedicalVerdict.reason}
        </Text>
      </View> */}

      <View className="bg-white p-6 rounded-[30px]  flex-row items-center justify-between w-full max-w-md shadow-sm">
        {/* Círculo de Calorias Totais */}
        <View className="w-32 h-32 rounded-full border-2 border-slate-300 items-center justify-center">
          <Text className="text-4xl font-bold text-slate-700">
            {evaluation.foodItemNutritionalInfoTotal.calories}
          </Text>
          <Text className="text-2xl text-slate-500">cal</Text>
        </View>

        {/* Lista de Macros */}
        <View className="flex-1 ml-6 gap-y-3">
          {/* Proteínas */}
          <View className="flex-row items-center justify-between border-2 border-green-500/40 rounded-xl px-3 py-2 bg-green-400/40">
            <View className="flex-row items-center">
              <Text>🥩 </Text>
              <Text className="font-medium text-slate-700">Proteínas</Text>
            </View>
            <Text className="font-bold text-slate-700">
              {evaluation.foodItemNutritionalInfoTotal.protein}g
            </Text>
          </View>

          {/* Carbos */}
          <View className="flex-row items-center justify-between border-2 border-yellow-800/40 rounded-xl px-3 py-2 bg-yellow-400/40">
            <View className="flex-row items-center">
              <Text>🍟 </Text>

              <Text className="font-medium text-slate-700">Carbos</Text>
            </View>
            <Text className="font-bold text-slate-700">
              {evaluation.foodItemNutritionalInfoTotal.carbs}g
            </Text>
          </View>

          {/* Terceira Opção (Gorduras/Calorias) */}
          <View className="flex-row items-center justify-between border-2 border-orange-800/40 rounded-xl px-3 py-2 bg-orange-400/40">
            <View className="flex-row items-center">
              <Text>🍯</Text>
              <Text className="font-medium text-slate-700">Gorduras</Text>
            </View>
            <Text className="font-bold text-slate-700">
              {evaluation.foodItemNutritionalInfoTotal.fat}g
            </Text>
          </View>
        </View>
      </View>

      {/* INFO RÁPIDA - CARBS */}
      <View className="flex-row px-5 gap-4 mt-6">
        <View className="flex-1 bg-zinc-50 border border-zinc-100 p-4 rounded-2xl items-center">
          <Text className="text-zinc-500 text-xs uppercase font-bold mb-1">
            Total Carboidratos
          </Text>
          <Text className="text-xl font-black text-slate-500">
            {evaluation.analysisSummary.totalCarbsScanned}g
          </Text>
        </View>
        <View className="flex-1 bg-zinc-50 border border-zinc-100 p-4 rounded-2xl items-center">
          <Text className="text-zinc-500 text-xs uppercase font-bold mb-1">
            Impacto
          </Text>
          <Text style={{ color: status.color }} className="text-lg font-black">
            {glycemicLabels[evaluation.foodItemsEvaluated[0].glycemicImpact] ||
              "Não definido"}
          </Text>
        </View>
      </View>

      {/* DETALHES DOS ITENS */}
      <View className="px-5 mt-8">
        <Text className="text-lg font-bold text-primary mb-4">
          Itens Identificados({evaluation.foodItemsEvaluated.length})
        </Text>
        {evaluation.foodItemsEvaluated.map((item, index) => (
          <View
            key={index}
            className="bg-white border border-zinc-200 rounded-2xl p-4 mb-3 flex-row items-center"
          >
            <View className="bg-soft p-3 rounded-xl mr-4">
              <Icon name="fast-food-outline" size={24} color="#0A6B49" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-primary text-base">
                {item.name}
              </Text>
              <Text className="text-zinc-500 text-sm leading-4">
                {item.recommendation}
              </Text>
            </View>
            {!item.isSafeForAllergies && (
              <Icon name="alert-circle" size={24} color="#EF4444" />
            )}
          </View>
        ))}
      </View>

      {/* PORÇÃO SUGERIDA */}
      <View className="bg-[#D9F8E5] rounded-2xl p-5 mx-5 mt-5">
        <Text className="text-[#0a6b49] text-base font-medium leading-6">
          Porção Sugerida
        </Text>

        <View className="mt-4 flex-row items-center gap-3">
          <View className="bg-[#0a6b49] p-2 rounded-xl">
            <Icon name="restaurant-outline" size={18} color="#fff" />
          </View>

          <Text className="text-[#0a6b49] font-semibold text-sm text-nowrap">
            {evaluation.finalMedicalVerdict.suggestedPortion}
          </Text>
        </View>
      </View>

      {/* ALTERNATIVAS SAUDÁVEIS */}
      <View className="px-5 mt-8 mb-10">
        <Text className="text-lg font-semibold mb-4">Alternativas Seguras</Text>
        <View className="flex-row flex-wrap text-wrap gap-2">
          {evaluation.finalMedicalVerdict.alternatives.map((alt, index) => (
            <View
              key={index}
              className="bg-soft px-4 py-2 rounded-full border border-zinc-400/50"
            >
              <Text className="text-zinc-700 font-semibold">🍃{alt}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* AÇÕES */}
      <View className="px-5 pb-10 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="p-4 rounded-2xl items-center justify-center border border-[#0a6b49] bg-[#D9F8E5]"
        >
          <Text className="text-[#0a6b49] font-bold text-lg">
            Salvar no Diário
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="p-4 rounded-2xl items-center justify-center border border-zinc-200"
        >
          <Text className="text-zinc-500 font-bold">Descartar análise</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
