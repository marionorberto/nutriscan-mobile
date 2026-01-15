import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const culturalOptions = [
  "Angolana",
  "Vegetariana",
  "Fast-food",
  "Mediterrânea",
];

const DietaryRoutineScreen = () => {
  const router = useRouter();

  const [mealsPerDay, setMealsPerDay] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);
  const [culturalPreference, setCulturalPreference] = useState<string | null>(
    null
  );
  const [religiousRestrictions, setReligiousRestrictions] = useState("");
  const [mealSchedule, setMealSchedule] = useState("");

  const [errors, setErrors] = useState<{
    mealsPerDay?: string;
    favoriteFoods?: string;
    culturalPreference?: string;
    religiousRestrictions?: string;
    mealSchedule?: string;
  }>({});

  const addFood = () => {
    if (!favoriteFood.trim()) return;
    setFavoriteFoods([...favoriteFoods, favoriteFood.trim()]);
    setFavoriteFood("");
  };

  const removeFood = (food: string) => {
    setFavoriteFoods(favoriteFoods.filter((f) => f !== food));
  };

  const validateDietForm = () => {
    const newErrors: typeof errors = {};

    // REFEIÇÕES POR DIA
    const mealsNumber = Number(mealsPerDay);
    if (!mealsPerDay) {
      newErrors.mealsPerDay = "Informe quantas refeições faz por dia";
    } else if (
      isNaN(mealsNumber) ||
      !Number.isInteger(mealsNumber) ||
      mealsNumber < 1 ||
      mealsNumber > 10
    ) {
      newErrors.mealsPerDay = "Número de refeições inválido (1–10)";
    }

    // ALIMENTOS FAVORITOS
    if (favoriteFoods.length === 0) {
      newErrors.favoriteFoods =
        "Selecione ou adicione pelo menos um alimento favorito";
    } else if (favoriteFoods.some((f) => f.trim().length === 0)) {
      newErrors.favoriteFoods =
        "Todos os alimentos devem ter pelo menos 1 caractere";
    }

    // PREFERÊNCIA CULTURAL
    if (!culturalPreference) {
      newErrors.culturalPreference = "Selecione uma preferência alimentar";
    } else if (!culturalOptions.includes(culturalPreference)) {
      newErrors.culturalPreference = "Preferência alimentar inválida";
    }

    // RESTRIÇÕES RELIGIOSAS
    if (religiousRestrictions && religiousRestrictions.trim().length < 3) {
      newErrors.religiousRestrictions = "Digite pelo menos 3 caracteres";
    }

    // HORÁRIOS
    if (mealSchedule && mealSchedule.trim().length < 5) {
      newErrors.mealSchedule = "Digite uma descrição válida dos horários";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDiet = () => {
    if (!validateDietForm()) return;

    console.log("Formulário de hábitos alimentares válido:", {
      mealsPerDay,
      favoriteFoods,
      culturalPreference,
      religiousRestrictions,
      mealSchedule,
    });
    // Aqui você pode enviar para API ou avançar para a próxima tela

    next();
  };

  const next = async () => {
    router.push({
      pathname: "/(auth)/login",
      params: {},
    });
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* HEADER */}
      <View className="mb-8">
        <Text className="text-sm text-[#24B370] font-semibold mb-2">
          Passo 6 de 6
        </Text>

        <Text className="text-3xl font-extrabold text-[#0a6b49]">
          Rotina alimentar
        </Text>

        <Text className="text-zinc-600 mt-2 text-base leading-6">
          Conte-nos como são seus hábitos para recomendações mais precisas.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-36">
          {/* REFEIÇÕES POR DIA */}
          <Card title="Quantas refeições faz por dia?">
            <Input
              icon="restaurant-outline"
              placeholder="Ex: 3"
              keyboardType="numeric"
              value={mealsPerDay}
              onChangeText={setMealsPerDay}
            />

            {errors.mealsPerDay && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.mealsPerDay}
              </Text>
            )}
          </Card>

          {/* ALIMENTOS FAVORITOS */}
          <Card title="Alimentos favoritos">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Input
                  icon="nutrition-outline"
                  placeholder="Ex: arroz, peixe, frutas"
                  value={favoriteFood}
                  onChangeText={setFavoriteFood}
                />
              </View>
              <TouchableOpacity
                onPress={addFood}
                className="bg-[#24B370] px-4 rounded-2xl justify-center"
              >
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.favoriteFoods && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.favoriteFoods}
              </Text>
            )}
            <View className="flex-row flex-wrap gap-2 mt-3">
              {favoriteFoods.map((food) => (
                <Chip
                  key={food}
                  label={food}
                  onRemove={() => removeFood(food)}
                />
              ))}
            </View>
          </Card>

          {/* PREFERÊNCIA CULTURAL */}
          <Card title="Preferência alimentar">
            <View className="flex-row flex-wrap gap-3">
              {culturalOptions.map((opt) => (
                <SelectableChip
                  key={opt}
                  label={opt}
                  selected={culturalPreference === opt}
                  onPress={() => setCulturalPreference(opt)}
                />
              ))}
            </View>

            {errors.culturalPreference && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.culturalPreference}
              </Text>
            )}
          </Card>

          {/* RESTRIÇÕES */}
          <Card title="Restrições religiosas ou culturais">
            <Input
              icon="alert-circle-outline"
              placeholder="Ex: não consumo carne de porco"
              value={religiousRestrictions}
              onChangeText={setReligiousRestrictions}
            />

            {errors.religiousRestrictions && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.religiousRestrictions}
              </Text>
            )}
          </Card>

          {/* HORÁRIOS */}
          <Card title="Horários habituais das refeições">
            <Input
              icon="time-outline"
              placeholder="Ex: Pequeno-almoço 7h, Almoço 13h, Jantar 20h"
              value={mealSchedule}
              onChangeText={setMealSchedule}
            />
          </Card>

          {errors.mealSchedule && (
            <Text className="text-red-500 mt-1 text-sm">
              {errors.mealSchedule}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* CTA FINAL */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            handleSubmitDiet();
          }}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">
            Concluir cadastro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* COMPONENTES AUXILIARES */

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="bg-zinc-100 rounded-3xl p-5 gap-4">
    <Text className="text-base font-semibold text-zinc-800">{title}</Text>
    {children}
  </View>
);

const Input = ({ icon, ...props }: any) => (
  <View className="flex-row items-center bg-white rounded-2xl px-4 border border-zinc-200">
    <Icon name={icon} size={20} color="#52525b" />
    <TextInput {...props} className="flex-1 px-3 py-4 text-base text-black" />
  </View>
);

const SelectableChip = ({
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

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <View className="flex-row items-center bg-white border border-zinc-300 rounded-full px-4 py-2 gap-2">
    <Text className="text-sm text-zinc-700">{label}</Text>
    <TouchableOpacity onPress={onRemove}>
      <Icon name="close-circle" size={18} color="#ef4444" />
    </TouchableOpacity>
  </View>
);

export default DietaryRoutineScreen;
