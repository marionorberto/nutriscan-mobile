import { API_URL } from "@/src/constants/data";
import { handleCreateAllergies } from "@/src/services/authService";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const commonAllergies: string[] = [];

export interface IAllergies {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const AllergiesScreen = () => {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  // ... dentro do componente
  const [allergies, setAllergies] = useState<IAllergies[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ allergies?: string }>({});

  const toggleAllergy = (condition: IAllergies) => {
    setSelectedAllergies((prev) => {
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
          const item = allergies.find((c) => c.id === id);
          return item?.description.toLowerCase() !== "nenhuma";
        });

        // Verificamos o limite de 4
        if (listWithoutNenhuma.length >= 4) {
          // Opcional: Alerta para o usuário
          alert("Você pode selecionar no máximo 4 allergias.");
          return prev;
        }

        // Adiciona a nova condição e garante que "Nenhuma" foi removido
        // commonAllergies.push(condition.description);
        return [...listWithoutNenhuma, condition.id];
      }
    });
  };

  const validateAllergies = () => {
    const newErrors: { allergies?: string } = {};

    if (selectedAllergies.length > 4) {
      newErrors.allergies = "Selecione no máximo 4 alergias";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAllergies = async () => {
    if (!validateAllergies()) return;

    if (selectedAllergies.length === 0) {
      return next();
    }

    await handleCreateAllergies(selectedAllergies, userID);
    next();
  };

  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${API_URL}/allergies/all`);

      // Conforme o seu JSON: data é um array onde o primeiro item [0] são os dados

      setAllergies(data[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const next = async () => {
    router.push({
      pathname: "/register-process/diabetis_profile",
      params: {
        userID,
      },
    });
  };

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
          Passo 4 de 6
        </Text>

        <Text className="text-3xl font-extrabold text-[#0a6b49]">Alergias</Text>

        <Text className="text-zinc-600 mt-2 text-base leading-6">
          Usamos estas informações para evitar recomendações perigosas.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          {/* CARD PRINCIPAL */}
          <View className="bg-zinc-100 rounded-3xl p-5">
            <Text className="text-base font-semibold text-zinc-800 mb-3">
              Possui alguma alergia alimentar?
            </Text>

            <Text className="text-sm text-zinc-500 mb-4">
              Pode selecionar várias opções
            </Text>

            {/* CHIPS COMUNS */}
            <View className="flex-row flex-wrap gap-3 mb-5">
              {allergies.map((allergy) => (
                <Chip
                  key={allergy.id}
                  label={allergy.description}
                  selected={selectedAllergies.includes(allergy.id)}
                  onPress={() => toggleAllergy(allergy)} // Passa o objeto completo
                />
              ))}
            </View>

            {/* INPUT CUSTOM */}
            {/* <View className="flex-row items-center bg-white rounded-2xl px-4 border border-zinc-200">
              <Icon name="alert-circle-outline" size={20} color="#52525b" />
              <TextInput
                placeholder="Adicionar outra alergia"
                value={customAllergy}
                onChangeText={setCustomAllergy}
                className="flex-1 px-3 py-4 text-base text-black"
                onSubmitEditing={addCustomAllergy}
              />
              <TouchableOpacity onPress={addCustomAllergy}>
                <Icon name="add-circle-outline" size={24} color="#24B370" />
              </TouchableOpacity>
            </View> */}
          </View>

          {/* PREVIEW */}
          {selectedAllergies.length > 0 ? (
            <View className="bg-[#D9F8E5] rounded-2xl p-4">
              {/* <Text className="text-sm font-semibold text-[#0a6b49] mb-2">
                Alergias registadas
              </Text> */}

              {/* <Text className="text-sm text-[#0a6b49]">
                {selectedAllergies.join(", ")}
              </Text> */}
            </View>
          ) : (
            <View>
              {errors.allergies && (
                <Text className="text-red-500 mt-2 text-sm">
                  {errors.allergies}
                </Text>
              )}

              <View className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                <Text className="text-sm text-zinc-500">
                  Nenhuma alergia selecionada
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            handleSubmitAllergies();
          }}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* CHIP */
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

export default AllergiesScreen;
