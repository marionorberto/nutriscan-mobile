import Icon from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WelcomeSecondScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container} className="bg-white">
      {/* IMAGE */}
      <View className="mt-16 mb-8">
        <Image
          contentFit="contain"
          transition={600}
          source={require("../src/assets/images/welcome-second-3.svg")}
          style={{ width: 320, height: 260 }}
        />
      </View>

      {/* TEXT */}
      <View className="px-8">
        <Text className="text-zinc-900 font-extrabold text-2xl text-center leading-tight">
          Saúde nas palmas das mãos
        </Text>

        <Text className="text-zinc-500 mt-3 text-center text-lg leading-relaxed">
          Acompanhe a sua alimentação, níveis de açúcar e hábitos diários de
          forma simples e segura.
        </Text>
      </View>

      {/* BOTTOM */}
      <View className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {/* STEPS */}
        <View className="flex-row justify-center mb-6">
          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-first");
            }}
          >
            <Icon name="dot-single" size={36} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-second");
            }}
          >
            <Icon name="dot-single" size={36} color="#24B370" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-third");
            }}
          >
            <Icon name="dot-single" size={36} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          className="flex-row justify-center items-center gap-2 py-4 rounded-full bg-[#24B370]"
          onPress={() => router.push("/welcome-third")}
          activeOpacity={0.85}
        >
          <Text className="text-white font-semibold text-xl">Continuar</Text>
          <Icon name="chevron-right" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeSecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
