import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const commonAllergies = [
  "Amendoim",
  "Leite",
  "Ovos",
  "Glúten",
  "Soja",
  "Frutos do mar",
  "Outra",
  "Nenhuma",
];

const AllergiesScreen = () => {
  const router = useRouter();

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ allergies?: string }>({});
  const [customAllergy, setCustomAllergy] = useState("");

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
  };

  const validateAllergies = () => {
    const newErrors: { allergies?: string } = {};

    if (selectedAllergies.length === 0) {
      newErrors.allergies = "Selecione pelo menos uma alergia alimentar";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAllergies = () => {
    if (!validateAllergies()) return;

    console.log("Alergias válidas:", selectedAllergies);
    // aqui você pode mandar para a API ou ir para a próxima tela

    next();
  };

  // const addCustomAllergy = () => {
  //   if (
  //     customAllergy.trim() &&
  //     !selectedAllergies.includes(customAllergy.trim())
  //   ) {
  //     setSelectedAllergies([...selectedAllergies, customAllergy.trim()]);
  //     setCustomAllergy("");
  //   }
  // };

  const next = async () => {
    router.push("/register-process/diabetis_profile");
  };

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
              {commonAllergies.map((allergy) => (
                <Chip
                  key={allergy}
                  label={allergy}
                  selected={selectedAllergies.includes(allergy)}
                  onPress={() => toggleAllergy(allergy)}
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
              <Text className="text-sm font-semibold text-[#0a6b49] mb-2">
                Alergias registadas
              </Text>

              <Text className="text-sm text-[#0a6b49]">
                {selectedAllergies.join(", ")}
              </Text>
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
