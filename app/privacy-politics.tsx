import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const PrivacyPolicyScreen = () => {
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

        <Text className="text-2xl font-bold text-primary">
          Política de Privacidade
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ICON */}
        <View className="items-center my-4">
          <View className="w-20 h-20 rounded-full bg-[#E6F7EF] items-center justify-center">
            <Icon name="document-text-outline" size={36} color="#0a6b49" />
          </View>
        </View>

        {/* INTRO */}
        <Text className="text-lg font-bold text-black mb-2">Introdução</Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          A NutriScan respeita a sua privacidade e está comprometida em proteger
          os dados pessoais dos seus utilizadores. Esta Política de Privacidade
          explica como recolhemos, utilizamos e protegemos as suas informações.
        </Text>

        {/* SECTION 1 */}
        <Text className="text-lg font-bold text-black mb-2">
          1. Dados que recolhemos
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          Podemos recolher os seguintes dados:
          {"\n"}• Nome e username
          {"\n"}• Endereço de email
          {"\n"}• Dados nutricionais e de saúde fornecidos pelo utilizador
          {"\n"}• Informações de uso da aplicação
        </Text>

        {/* SECTION 2 */}
        <Text className="text-lg font-bold text-black mb-2">
          2. Como usamos as informações
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          Utilizamos os dados recolhidos para:
          {"\n"}• Fornecer funcionalidades da aplicação
          {"\n"}• Melhorar a experiência do utilizador
          {"\n"}• Enviar notificações e alertas
          {"\n"}• Garantir segurança e prevenção de fraudes
        </Text>

        {/* SECTION 3 */}
        <Text className="text-lg font-bold text-black mb-2">
          3. Segurança dos dados
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          Implementamos medidas técnicas e organizacionais para proteger os seus
          dados contra acessos não autorizados, perdas ou usos indevidos.
        </Text>

        {/* SECTION 4 */}
        <Text className="text-lg font-bold text-black mb-2">
          4. Partilha de dados
        </Text>
        <Text className="text-zinc-700 leading-6 mb-4">
          A NutriScan não vende nem partilha os seus dados pessoais com
          terceiros, exceto quando exigido por lei ou com o seu consentimento
          explícito.
        </Text>

        {/* SECTION 5 */}
        <Text className="text-lg font-bold text-black mb-2">
          5. Direitos do utilizador
        </Text>
        <Text className="text-zinc-700 leading-6 mb-6">
          O utilizador tem o direito de aceder, corrigir ou eliminar os seus
          dados pessoais, bem como revogar consentimentos a qualquer momento.
        </Text>

        {/* FOOTER */}
        <Text className="text-center text-zinc-400 text-sm mb-8">
          Última atualização: Janeiro 2025
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
