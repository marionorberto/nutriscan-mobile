import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const FAQ_DATA = [
  {
    question: "O que é o NutriScan?",
    answer:
      "O NutriScan é um aplicativo de apoio alimentar para pacientes com diabetes, permitindo analisar refeições através de imagens e fornecer informações nutricionais como calorias, carboidratos e índice glicêmico.",
  },
  {
    question: "Como funciona o scan dos alimentos?",
    answer:
      "Utilizamos inteligência artificial para identificar alimentos a partir de imagens e cruzamos essas informações com bases nutricionais confiáveis.",
  },
  {
    question: "O aplicativo substitui um nutricionista ou médico?",
    answer:
      "Não. O NutriScan é uma ferramenta de apoio e educação alimentar, não substituindo acompanhamento profissional.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Todos os dados são tratados com confidencialidade e seguem boas práticas de segurança e privacidade.",
  },
  {
    question: "O aplicativo é gratuito?",
    answer:
      "O NutriScan possui funcionalidades gratuitas e poderá incluir recursos premium no futuro.",
  },
];

const AboutScreen = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        <Text className="text-2xl font-bold text-primary">Sobre o App</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* INTRO */}
        <View className="bg-[#D9F8E5] rounded-2xl p-5 mb-6 mt-4">
          <Text className="text-2xl font-extrabold text-[#0a6b49] mb-2">
            nutriScan
          </Text>
          <Text className="text-zinc-700 leading-6">
            Uma solução digital focada no controlo alimentar inteligente e apoio
            a pacientes com diabetes, promovendo hábitos mais saudáveis através
            da tecnologia.
          </Text>
        </View>

        {/* FAQ */}
        <Text className="text-xl font-bold text-black mb-3">
          Perguntas Frequentes
        </Text>

        <View className="gap-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <View
                key={index}
                className="bg-white border border-zinc-200 rounded-xl"
              >
                <Pressable
                  onPress={() => setOpenIndex(isOpen ? null : index)}
                  className="flex-row justify-between items-center px-4 py-4"
                >
                  <Text className="text-base font-semibold text-black w-10/12">
                    {item.question}
                  </Text>
                  <Icon
                    name={isOpen ? "remove-outline" : "add-outline"}
                    size={22}
                    color="#0a6b49"
                  />
                </Pressable>

                {isOpen && (
                  <View className="px-4 pb-4">
                    <Text className="text-zinc-600 leading-6">
                      {item.answer}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* CONTACT */}
        <View className="mt-8 bg-white border border-zinc-200 rounded-2xl p-5">
          <Text className="text-lg font-bold text-black mb-2">
            Suporte & Contacto
          </Text>
          <Text className="text-zinc-600 mb-1">
            <Icon name="mail-outline" size={22} color="#0A6B49" />
            Email: suporte@nutriscan.app
          </Text>

          <Text className="text-zinc-600">
            <Icon name="at-outline" size={22} color="#0A6B49" /> Website:
            www.nutriscan.app
          </Text>
        </View>

        {/* VERSION */}
        <Text className="text-center text-zinc-400 text-sm mt-8 mb-6">
          nutriScan · Versão 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
