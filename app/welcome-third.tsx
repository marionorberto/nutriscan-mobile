import Icon from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChooseScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-20 pb-10 justify-between">
      {/* BRAND */}
      <View className="items-center">
        <Image
          source={require("../src/assets/images/logo-bg-removed.png")}
          style={{ width: 110, height: 100 }}
        />

        <Text className="mt-2 text-4xl font-extrabold text-[#0a6b49] tracking-tight">
          NutriScan
        </Text>

        <Text className="text-center text-zinc-500 mt-4 text-base leading-6 px-4">
          Apoio inteligente para controlo alimentar e acompanhamento nutricional
          em pacientes com diabetes.
        </Text>
      </View>

      {/* ACTION BUTTONS */}
      <View className="gap-4">
        {/* LOGIN */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.85}
          className="bg-[#0a6b49] py-4 rounded-2xl flex-row justify-center items-center gap-3 shadow-sm"
        >
          <Icon name="log-in-outline" size={22} color="#fff" />
          <Text className="text-white font-bold text-lg">Entrar</Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/register")}
          activeOpacity={0.85}
          className="border-2 border-[#0a6b49] py-4 rounded-2xl flex-row justify-center items-center gap-3"
        >
          <Icon name="person-add-outline" size={22} color="#0a6b49" />
          <Text className="text-[#0a6b49] font-bold text-lg">Criar conta</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <TouchableOpacity
        onPress={() => router.push("/about")}
        activeOpacity={0.7}
        className="items-center"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-zinc-400 text-sm underline">
            Saber mais sobre o app
          </Text>
          <Icon name="arrow-forward-outline" size={14} color="#a1a1aa" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseScreen;
