import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password.length > 0 && password === confirmPassword;

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

        <Text className="text-2xl font-bold text-primary">Nova senha</Text>
      </View>

      {/* CONTENT */}
      <View className="flex-1 justify-center">
        {/* ICON */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-[#D9F8E5] items-center justify-center">
            <Icon name="shield-checkmark-outline" size={36} color="#0a6b49" />
          </View>
        </View>

        {/* TEXT */}
        <Text className="text-2xl font-bold text-black text-center">
          Crie uma nova senha
        </Text>
        <Text className="text-zinc-600 text-center mt-2 leading-5">
          A sua nova senha deve ser diferente da anterior.
        </Text>

        {/* INPUTS */}
        <View className="mt-8">
          <Text className="mb-2 font-semibold text-black">Nova senha</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Nova senha"
            className="bg-zinc-100 px-4 py-4 rounded-xl text-base text-black"
          />
        </View>

        <View className="mt-4">
          <Text className="mb-2 font-semibold text-black">Confirmar senha</Text>
          <TextInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar senha"
            className="bg-zinc-100 px-4 py-4 rounded-xl text-base text-black"
          />
        </View>

        {/* FEEDBACK */}
        {confirmPassword.length > 0 && !passwordsMatch && (
          <Text className="text-red-500 mt-2 text-sm">
            As senhas não coincidem.
          </Text>
        )}

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!passwordsMatch}
          className={`mt-8 py-4 rounded-full items-center ${
            passwordsMatch ? "bg-[#0a6b49]" : "bg-zinc-300"
          }`}
          onPress={() => {
            // futuramente: API reset password
            router.replace("/(auth)/login");
          }}
        >
          <Text className="text-white text-lg font-semibold">
            Atualizar senha
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text className="text-zinc-500 underline">Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
