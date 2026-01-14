import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* HEADER / BRAND */}
      <View className="items-center mb-8">
        <Image
          source={require("../../src/assets/images/logo-bg-removed.png")}
          className="w-28 h-24 mb-4"
          resizeMode="contain"
        />

        <Text className="text-3xl font-extrabold text-slate-900 text-center">
          Criar conta
        </Text>
        <Text className="text-zinc-600 text-center mt-2 text-base">
          Regista-te para começar o controlo alimentar inteligente.
        </Text>
      </View>

      {/* FORM */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="gap-4">
          {/* USERNAME */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Username
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon name="person-outline" size={20} color="#52525b" />
              <TextInput
                placeholder="username"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base text-black"
              />
            </View>
          </View>

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

          {/* CONFIRM PASSWORD */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Confirmar palavra-passe
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

          {/* LINK LOGIN */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="mt-2"
          >
            <Text className="text-zinc-500 underline text-right">
              Já tem conta? Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="pb-8 pt-4">
        <TouchableOpacity
          onPress={() => router.push("/register-process/personal-data")}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow"
        >
          <Text className="text-white font-bold text-xl">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
