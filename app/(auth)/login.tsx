import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* HEADER / BRAND */}
      <View className="items-center mb-10">
        <Image
          source={require("../../src/assets/images/logo-bg-removed.png")}
          className="w-28 h-24 mb-4"
          resizeMode="contain"
        />

        <Text className="text-3xl font-extrabold text-[#0a6b49]">
          Bem-vindo
        </Text>
        <Text className="text-zinc-600 text-center mt-2 text-base">
          Acesse sua conta para continuar o acompanhamento alimentar.
        </Text>
      </View>

      {/* FORM */}
      <View className="gap-4">
        {/* EMAIL */}
        <View>
          <Text className="mb-2 font-semibold text-base text-zinc-700">
            Email
          </Text>
          <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
            <Icon name="mail-outline" size={20} color="#52525b" />
            <TextInput
              placeholder="exemplo@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 px-3 py-4 text-base text-black"
            />
          </View>
        </View>

        {/* PASSWORD */}
        <View>
          <Text className="mb-2 font-semibold text-base text-zinc-700">
            Palavra-passe
          </Text>
          <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
            <Icon name="lock-closed-outline" size={20} color="#52525b" />
            <TextInput
              placeholder="********"
              secureTextEntry
              className="flex-1 px-3 py-4 text-base text-black"
            />
          </View>
        </View>

        {/* ACTION LINKS */}
        <View className="flex-row justify-between items-center mt-2">
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-[#0a6b49] font-semibold">Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/forgot-password");
            }}
          >
            <Text className="text-zinc-500 underline">Esqueci a senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BIOMETRIC */}
      <View className="items-center mt-8">
        <Text className="text-zinc-500 mb-2 text-sm">
          Ou entrar com biometria
        </Text>
        <TouchableOpacity className="bg-zinc-200 p-4 rounded-full">
          <Icon name="finger-print-outline" size={40} color="#0a6b49" />
        </TouchableOpacity>
      </View>

      {/* CTA */}
      <View className="mt-auto pb-10">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow"
        >
          <Text className="text-white font-bold text-xl">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
