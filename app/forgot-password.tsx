import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPasswordScreen = () => {
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

        <Text className="text-2xl font-bold text-primary">Recuperar senha</Text>
      </View>

      {/* CONTENT */}
      <View className="flex-1 justify-center">
        {/* ICON */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-[#D9F8E5] items-center justify-center">
            <Icon name="lock-closed-outline" size={36} color="#0a6b49" />
          </View>
        </View>

        {/* TEXT */}
        <Text className="text-2xl font-bold text-black text-center">
          Esqueceu a sua senha?
        </Text>
        <Text className="text-zinc-600 text-center mt-2 leading-5">
          Introduza o seu email e enviaremos um link para redefinir a sua senha.
        </Text>

        {/* INPUT */}
        <View className="mt-8">
          <Text className="mb-2 font-semibold text-black">Email</Text>
          <TextInput
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-zinc-100 px-4 py-4 rounded-xl text-base text-black"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          className="mt-8 bg-[#24B370] py-4 rounded-full items-center"
          onPress={() => {
            // futuramente: enviar email
            router.push("/reset-password");
          }}
        >
          <Text className="text-white text-lg font-semibold">
            Enviar link de recuperação
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-zinc-500 underline">Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
