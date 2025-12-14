import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const TermsOfUseScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-5">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">Termos de Uso</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ICON */}
        <View className="items-center my-4">
          <View className="w-20 h-20 rounded-full bg-[#E6F7EF] items-center justify-center">
            <Icon name="document-outline" size={36} color="#0a6b49" />
          </View>
        </View>

        {/* INTRO */}
        <Text className="text-lg font-bold text-black mb-2">Introdução</Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          Estes Termos de Uso regulam a utilização da aplicação NutriScan. Ao
          aceder ou utilizar a aplicação, o utilizador concorda com os termos
          aqui descritos.
        </Text>

        {/* SECTION 1 */}
        <Text className="text-lg font-bold text-black mb-2">
          1. Aceitação dos Termos
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          Ao criar uma conta ou utilizar a NutriScan, o utilizador declara que
          leu, compreendeu e aceitou estes Termos de Uso.
        </Text>

        {/* SECTION 2 */}
        <Text className="text-lg font-bold text-black mb-2">
          2. Uso da Aplicação
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          A NutriScan destina-se ao apoio nutricional e informativo. As
          informações fornecidas não substituem aconselhamento médico
          profissional.
        </Text>

        {/* SECTION 3 */}
        <Text className="text-lg font-bold text-black mb-2">
          3. Conta do Utilizador
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          O utilizador é responsável por manter a confidencialidade das suas
          credenciais de acesso e por todas as atividades realizadas na sua
          conta.
        </Text>

        {/* SECTION 4 */}
        <Text className="text-lg font-bold text-black mb-2">
          4. Responsabilidades
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          O utilizador compromete-se a utilizar a aplicação de forma responsável
          e legal, não devendo utilizá-la para fins ilícitos ou abusivos.
        </Text>

        {/* SECTION 5 */}
        <Text className="text-lg font-bold text-black mb-2">
          5. Limitação de Responsabilidade
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          A NutriScan não se responsabiliza por decisões tomadas com base nas
          informações fornecidas pela aplicação.
        </Text>

        {/* SECTION 6 */}
        <Text className="text-lg font-bold text-black mb-2">
          6. Alterações aos Termos
        </Text>
        <Text className="text-zinc-700 leading-6 mb-6">
          Reservamo-nos o direito de atualizar estes Termos de Uso a qualquer
          momento. Recomenda-se a revisão periódica deste documento.
        </Text>

        {/* FOOTER */}
        <Text className="text-center text-zinc-400 text-sm mb-8">
          Última atualização: Janeiro 2025
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsOfUseScreen;
