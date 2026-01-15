import Icon from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const activityLevels = ["Sedentário", "Moderado", "Ativo"];
const conditions = ["Hipertensão", "Obesidade", "Colesterol alto", "Nenhuma"];

const ClinicalProfileScreen = () => {
  const router = useRouter();
  const {
    email,
    password,
    firstname,
    lastname,
    birthday,
    gender,
    phone,
    province,
    municipy,
    neighbourhood,
    img,
  } = useLocalSearchParams();

  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState<
    string | null
  >(null);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const [errors, setErrors] = useState<{
    weight?: string;
    height?: string;
    physicalActivityLevel?: string;
    selectedConditions?: string;
  }>({});

  const validateHealthForm = () => {
    const newErrors: typeof errors = {};

    // WEIGHT
    const weightNumber = Number(weight);
    if (!weight) {
      newErrors.weight = "O peso é obrigatório";
    } else if (isNaN(weightNumber) || weightNumber < 20 || weightNumber > 500) {
      newErrors.weight = "Peso inválido (20 - 500 kg)";
    }

    // HEIGHT
    const heightNumber = Number(height);
    if (!height) {
      newErrors.height = "A altura é obrigatória";
    } else if (isNaN(heightNumber) || heightNumber < 50 || heightNumber > 300) {
      newErrors.height = "Altura inválida (50 - 300 cm)";
    }

    // PHYSICAL ACTIVITY
    if (!physicalActivityLevel) {
      newErrors.physicalActivityLevel = "Selecione o nível de atividade física";
    } else if (!activityLevels.includes(physicalActivityLevel)) {
      newErrors.physicalActivityLevel = "Nível de atividade inválido";
    }

    // CONDITIONS (opcional)
    if (selectedConditions.length > 0) {
      const invalidConditions = selectedConditions.filter(
        (c) => !conditions.includes(c)
      );
      if (invalidConditions.length > 0) {
        newErrors.selectedConditions = "Condições inválidas selecionadas";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitHealth = () => {
    if (!validateHealthForm()) return;

    console.log("Formulário de saúde válido, pronto para enviar para a API");

    next();
  };

  const next = async () => {
    router.push({
      pathname: "/register-process/allergies",
      params: {},
    });
  };

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
              {conditions.map((condition) => (
                <Chip
                  key={condition}
                  label={condition}
                  selected={selectedConditions.includes(condition)}
                  onPress={() => toggleCondition(condition)}
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

export default ClinicalProfileScreen;
