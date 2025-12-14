import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MainScreen() {
  const router = useRouter();
  return (
    <ScrollView
      className="flex-1 bg-white px-5"
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="flex-row justify-between items-center mt-6 mb-8">
        <View>
          <Text className="text-2xl font-semibold text-primary">
            Bom dia, Mário 👋
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Terça-feira · Manhã
          </Text>
        </View>

        <View className="w-14 h-14 rounded-full bg-zinc-400 items-center justify-center">
          {/* <Text className="text-lg font-semibold text-primary">M</Text> */}
          <Image
            source={require("../../src/assets/images/avatar.png")}
            className="w-14 h-14 rounded-full border-2 border-white"
          />
        </View>
      </View>

      {/* HOJE */}
      <Text className="text-lg font-semibo ld text-primary mb-3">
        Hoje{" "}
        <Pressable
          onPress={() => router.push("/notification")}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mt-3"
        >
          <Icon name="notifications" size={22} color="#0A6B49" />
        </Pressable>
      </Text>

      {/* CARBOIDRATOS */}
      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
        <Text className="text-sm text-gray-500 mb-1">🌾 Carboidratos</Text>

        <Text className="text-2xl font-bold text-primary">
          45g <Text className="text-sm font-normal text-gray-500">/ 120g</Text>
        </Text>

        <View className="h-2 bg-gray-200 rounded-full my-3">
          <View className="h-2 bg-secondary rounded-full w-[38%]" />
        </View>

        <Text className="text-sm text-primary font-medium">
          Dentro do limite recomendado
        </Text>
      </View>

      {/* CALORIAS */}
      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <Text className="text-sm text-gray-500 mb-1">🔥 Calorias</Text>

        <Text className="text-2xl font-bold text-primary">
          820{" "}
          <Text className="text-sm font-normal text-gray-500">/ 2000 kcal</Text>
        </Text>

        <View className="h-2 bg-gray-200 rounded-full my-3">
          <View className="h-2 bg-secondary rounded-full w-[41%]" />
        </View>

        <Text className="text-sm text-gray-500">Consumo moderado</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        className="mb-8 rounded-3xl bg-[#0a6b49] p-5 shadow-lg"
      >
        <View className="flex-row items-center justify-between">
          {/* TEXT */}
          <View className="flex-1 pr-4">
            <Text className="text-white text-xl font-extrabold">
              Analisar alimento
            </Text>

            <Text className="text-[#D9F8E5] text-sm mt-1 leading-5">
              Tire uma foto e receba informações nutricionais em segundos
            </Text>
          </View>

          {/* ICON */}
          <View className="bg-white/15 p-4 rounded-2xl">
            <Icon name="scan-outline" size={28} color="#ffffff" />
          </View>
        </View>
      </TouchableOpacity>

      {/* ÚLTIMA ANÁLISE */}
      <Text className="text-lg font-semibold text-primary mb-3">
        Última análise
      </Text>

      <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <Text className="text-lg font-semibold text-primary">Banana</Text>
        <Text className="text-sm text-gray-500 mb-3">08:40 · Porção média</Text>

        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">🌾 Carboidratos</Text>
          <Text className="text-sm font-semibold text-primary">23g</Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-sm text-gray-600">📊 Índice glicêmico</Text>
          <Text className="text-sm font-semibold text-primary">Médio</Text>
        </View>

        <Text className="text-sm font-medium text-primary">
          ✔ Adequado no momento
        </Text>
      </View>

      {/* RECOMENDAÇÃO PERSONALIZADA */}
      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold text-[#0a6b49]">
            Para você hoje
          </Text>

          <View className="bg-[#D9F8E5] px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-[#0a6b49]">
              Recomendação
            </Text>
          </View>
        </View>

        <View className="bg-[#D9F8E5] rounded-2xl p-5">
          <Text className="text-[#0a6b49] text-base font-medium leading-6">
            Prefira alimentos ricos em fibras neste período do dia.
          </Text>

          <View className="mt-4 flex-row items-center gap-3">
            <View className="bg-[#0a6b49] p-2 rounded-xl">
              <Icon name="checkmark-outline" size={18} color="#fff" />
            </View>

            <Text className="text-[#0a6b49] font-semibold text-sm">
              Boa hora para proteínas e vegetais
            </Text>
          </View>
        </View>
      </View>

      {/* RESUMO SEMANAL */}
      <Text className="text-lg font-semibold text-primary mb-3">
        Resumo da semana
      </Text>

      <View className="flex-row justify-between mb-10">
        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">12</Text>
          <Text className="text-xs text-gray-500 mt-1">Refeições</Text>
        </View>

        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">85%</Text>
          <Text className="text-xs text-gray-500 mt-1">Aderência</Text>
        </View>

        <View className="w-[30%] bg-white border border-gray-200 rounded-2xl p-4 items-center">
          <Text className="text-base font-bold text-primary">Estável</Text>
          <Text className="text-xs text-gray-500 mt-1">Glicemia</Text>
        </View>
      </View>
    </ScrollView>
  );
}
