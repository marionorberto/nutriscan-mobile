import { API_URL } from "@/src/constants/data";
import { handleCinicalProfile } from "@/src/services/authService";
import Icon from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export enum EnumPhysicalActivityLevel {
  sedentary = "SEDENTARY",
  moderate = "MODERATE",
  active = "ACTIVE",
}

const activityLevels = [
  EnumPhysicalActivityLevel.active,
  EnumPhysicalActivityLevel.moderate,
  EnumPhysicalActivityLevel.sedentary,
];

const ClinicalProfileScreen = () => {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [physicalActivityLevel, setPhysicalActivityLevel] =
    useState<string>("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (condition: AssociatedCondition) => {
    setSelectedConditions((prev) => {
      const isSelected = prev.includes(condition.id);
      const isNenhuma = condition.description.toLowerCase() === "nenhuma";

      // 1. Se clicar em "Nenhuma"
      if (isNenhuma) {
        // Se já estava selecionado, remove. Se não, seleciona APENAS ele (limpa o resto).
        return isSelected ? [] : [condition.id];
      }

      // 2. Se clicar em qualquer outra condição
      if (isSelected) {
        // Se já estava selecionado, apenas remove
        return prev.filter((id) => id !== condition.id);
      } else {
        // Se não estava selecionado:

        // Primeiro, removemos o "Nenhuma" da lista caso ele esteja lá
        const listWithoutNenhuma = prev.filter((id) => {
          const item = associatedConditions.find((c) => c.id === id);
          return item?.description.toLowerCase() !== "nenhuma";
        });

        // Verificamos o limite de 4
        if (listWithoutNenhuma.length >= 4) {
          // Opcional: Alerta para o usuário
          alert("Você pode selecionar no máximo 4 condições.");
          return prev;
        }

        // Adiciona a nova condição e garante que "Nenhuma" foi removido
        return [...listWithoutNenhuma, condition.id];
      }
    });
  };

  interface AssociatedCondition {
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  // ... dentro do componente
  const [associatedConditions, setAssociatedConditions] = useState<
    AssociatedCondition[]
  >([]);
  // Guardaremos apenas os IDs das condições selecionadas para facilitar a comparação

  const [errors, setErrors] = useState<{
    weight?: string;
    height?: string;
    physicalActivityLevel?: string;
    selectedConditions?: string;
  }>({});

  const validateHealthForm = () => {
    const newErrors: typeof errors = {};

    // ... (Peso, Altura e Atividade Física permanecem iguais)
    const weightNumber = Number(weight);
    if (!weight) newErrors.weight = "O peso é obrigatório";
    else if (isNaN(weightNumber) || weightNumber < 20 || weightNumber > 500) {
      newErrors.weight = "Peso inválido (20 - 500 kg)";
    }

    const heightNumber = Number(height);
    if (!height) newErrors.height = "A altura é obrigatória";
    else if (isNaN(heightNumber) || heightNumber < 50 || heightNumber > 300) {
      newErrors.height = "Altura inválida (50 - 300 cm)";
    }

    if (!physicalActivityLevel) {
      newErrors.physicalActivityLevel = "Selecione o nível de atividade física";
    }

    // --- VALIDAÇÃO DAS CONDIÇÕES (Ajustada) ---

    if (selectedConditions.length > 0) {
      // 1. Verifica o limite máximo de 4
      if (selectedConditions.length > 4) {
        newErrors.selectedConditions = "Selecione no máximo 4 condições";
      }

      // 2. Verifica se os IDs selecionados realmente existem na lista que veio da API
      // Criamos um array só com os IDs válidos para comparar
      const validIds = associatedConditions.map((c) => c.id);
      const hasInvalid = selectedConditions.some(
        (id) => !validIds.includes(id),
      );

      if (hasInvalid) {
        newErrors.selectedConditions =
          "Uma ou mais condições selecionadas são inválidas";
      }

      // 3. Regra de exclusividade do "Nenhuma" (Opcional, pois o toggle já trata)
      const itemNenhuma = associatedConditions.find(
        (c) => c.description.toLowerCase() === "nenhuma",
      );

      if (
        itemNenhuma &&
        selectedConditions.includes(itemNenhuma.id) &&
        selectedConditions.length > 1
      ) {
        newErrors.selectedConditions =
          "A opção 'Nenhuma' não pode ser selecionada com outras condições";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitHealth = async () => {
    if (!validateHealthForm()) return;

    const { data } = await handleCinicalProfile(
      weight,
      height,
      physicalActivityLevel,
      selectedConditions,
      userID,
    );

    next();
  };

  const next = async () => {
    router.push({
      pathname: "/register-process/allergies",
      params: {
        userID,
      },
    });
  };

  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${API_URL}/associated-conditions/all`);

      // Conforme o seu JSON: data é um array onde o primeiro item [0] são os dados

      setAssociatedConditions(data[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* HEADER */}
      <View className="mb-8">
        <Text className="text-sm text-[#24B370] font-semibold mb-2">
          Passo 3 de 6
        </Text>

        <Text className="text-3xl font-extrabold text-[#0a6b49]">
          Perfil clínico
        </Text>

        <Text className="text-zinc-600 mt-2 text-base leading-6">
          Informações físicas e clínicas ajudam a ajustar metas e alertas.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          {/* CARD – DADOS CORPORAIS */}
          <View className="bg-zinc-100 rounded-3xl p-5">
            <Text className="text-base font-semibold text-zinc-800 mb-4">
              Dados corporais
            </Text>

            <View className="flex-row gap-4">
              <Input
                icon="scale-outline"
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />

              <Input
                icon="resize-outline"
                placeholder="Altura (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>
            {errors.height && (
              <Text className="text-red-500 mt-1 text-sm">{errors.height}</Text>
            )}
            {errors.weight && (
              <Text className="text-red-500 mt-1 text-sm">{errors.weight}</Text>
            )}
          </View>

          {/* CARD – ATIVIDADE FÍSICA */}
          <View className="bg-zinc-100 rounded-3xl p-5">
            <Text className="text-base font-semibold text-zinc-800 mb-4">
              Nível de atividade física
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {activityLevels.map((level) => (
                <Chip
                  key={level}
                  label={level}
                  selected={physicalActivityLevel === level}
                  onPress={() => setPhysicalActivityLevel(level)}
                />
              ))}
            </View>
            {errors.physicalActivityLevel && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.physicalActivityLevel}
              </Text>
            )}
          </View>

          {/* CARD – CONDIÇÕES ASSOCIADAS */}
          <View className="bg-zinc-100 rounded-3xl p-5">
            <Text className="text-base font-semibold text-zinc-800 mb-4">
              Condições associadas
            </Text>

            <Text className="text-sm text-zinc-500 mb-3">
              Pode selecionar mais de uma opção
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {associatedConditions.map((condition) => (
                <Chip
                  key={condition.id}
                  label={condition.description}
                  selected={selectedConditions.includes(condition.id)}
                  onPress={() => toggleCondition(condition)} // Passa o objeto completo
                />
              ))}
            </View>

            {errors.selectedConditions && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.selectedConditions}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            handleSubmitHealth();
          }}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* COMPONENTES AUXILIARES */

const Input = ({
  icon,
  placeholder,
  keyboardType,
  value,
  onChangeText,
}: {
  icon: any;
  placeholder: string;
  keyboardType?: any;
  value: any;
  onChangeText: any;
}) => (
  <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 border border-zinc-200">
    <Icon name={icon} size={20} color="#52525b" />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      className="flex-1 px-3 py-4 text-base text-black"
    />
  </View>
);

const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border ${
      selected ? "bg-[#24B370] border-[#24B370]" : "bg-white border-zinc-300"
    }`}
  >
    <Text
      className={`text-sm font-medium ${
        selected ? "text-white" : "text-zinc-700"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  description: { fontSize: 16 },
});

export default ClinicalProfileScreen;
