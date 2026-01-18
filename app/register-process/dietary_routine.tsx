import { handleCreateDietaryRoutine } from "@/src/services/authService";
import Icon from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const culturalOptions = ["angolana", "vegetariana", "fastfood", "mediterrania"];

const DietaryRoutineScreen = () => {
  const router = useRouter();
  const { userID }: { userID: string } = useLocalSearchParams();

  const [mealTimes, setMealTimes] = useState<string[]>([]); // Array de horários ["08:00", "12:30"]
  const [showPicker, setShowPicker] = useState(false); // Controla a visibilidade do relógio

  const [mealsPerDay, setMealsPerDay] = useState("");

  const [favoriteFood, setFavoriteFood] = useState("");
  const [favoriteFoods, setFavoriteFoods] = useState<string[]>([]);

  const [foodsToAvoid, setfoodsToAvoid] = useState("");
  const [foodsToAvoids, setfoodsToAvoids] = useState<string[]>([]);

  const [culturalPreference, setCulturalPreference] = useState<string>("");
  const [religiousRestriction, setReligiousRestriction] = useState("");
  const [religiousRestrictions, setReligiousRestrictions] = useState<string[]>(
    [],
  );

  const handleMealsPerDayChange = (text: string) => {
    // 1. Remove qualquer caractere que não seja número
    const numericValue = text.replace(/[^0-9]/g, "");

    // 2. Transforma em número para validar o intervalo
    const num = Number(numericValue);

    // 3. Só atualiza o estado se estiver vazio (permitindo apagar) ou entre 1 e 5
    if (numericValue === "" || (num >= 1 && num <= 5)) {
      setMealsPerDay(numericValue);

      // Opcional: Se o usuário diminuir o número de refeições,
      // podemos limpar os horários excedentes
      if (num > 0 && mealTimes.length > num) {
        setMealTimes(mealTimes.slice(0, num));
      }
    }
  };

  const [errors, setErrors] = useState<{
    mealsPerDay?: string;
    favoriteFoods?: string;
    foodToAvoids?: string;
    culturalPreference?: string;
    religiousRestrictions?: string;
    mealSchedule?: string;
  }>({});

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (event.type === "set" && selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, "0");
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
      const newTime = `${hours}:${minutes}`;

      // --- VALIDAÇÃO DE DUPLICIDADE ---
      if (mealTimes.includes(newTime)) {
        ToastAndroid.show(
          "Este horário já foi adicionado!",
          ToastAndroid.SHORT,
        ); // Ou use um estado de erro
        return;
      }

      const maxAllowed = Number(mealsPerDay) || 0;

      if (mealTimes.length < maxAllowed) {
        setMealTimes([...mealTimes, newTime]);
      } else {
        ToastAndroid.show(
          `Você já adicionou o limite de ${maxAllowed} refeições.`,
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const addFood = () => {
    const cleanFood = favoriteFood.trim();

    // 1. Verifica se está vazio
    if (!cleanFood) return;

    // 2. Verifica se já existe no array (case-insensitive)
    const alreadyExists = favoriteFoods.some(
      (item) => item.toLowerCase() === cleanFood.toLowerCase(),
    );

    if (alreadyExists) {
      // Opcional: Você pode disparar um alerta ou definir um erro temporário
      ToastAndroid.show("Este alimento já foi adicionado.", ToastAndroid.SHORT);
      return;
    }

    // 3. Adiciona e limpa o campo
    setFavoriteFoods([...favoriteFoods, cleanFood]);
    setFavoriteFood("");
  };

  const removeFood = (food: string) => {
    setFavoriteFoods(favoriteFoods.filter((f) => f !== food));
  };

  const addFoodToAvoid = () => {
    const cleanFood = foodsToAvoid.trim();

    // 1. Verifica se está vazio
    if (!cleanFood) return;

    // 2. Verifica se já existe no array (case-insensitive)
    const alreadyExists = foodsToAvoids.some(
      (item) => item.toLowerCase() === cleanFood.toLowerCase(),
    );

    if (alreadyExists) {
      // Opcional: Você pode disparar um alerta ou definir um erro temporário
      ToastAndroid.show("Este alimento já foi adicionado.", ToastAndroid.SHORT);
      return;
    }

    // 3. Adiciona e limpa o campo
    setfoodsToAvoids([...foodsToAvoids, cleanFood]);
    setfoodsToAvoid("");
  };

  const removeFoodToAvoid = (food: string) => {
    setfoodsToAvoids(foodsToAvoids.filter((f) => f !== food));
  };

  const addReligiousRestriction = () => {
    const cleanFood = religiousRestriction.trim();

    // 1. Verifica se está vazio
    if (!cleanFood) return;

    // 2. Verifica se já existe no array (case-insensitive)
    const alreadyExists = religiousRestrictions.some(
      (item) => item.toLowerCase() === cleanFood.toLowerCase(),
    );

    if (alreadyExists) {
      // Opcional: Você pode disparar um alerta ou definir um erro temporário
      ToastAndroid.show(
        "Esta restrição já foi adicionada.",
        ToastAndroid.SHORT,
      );
      return;
    }

    setReligiousRestrictions([
      ...religiousRestrictions,
      religiousRestriction.trim(),
    ]);
    setReligiousRestriction("");
  };

  const removeReligiousRestriction = (food: string) => {
    setReligiousRestrictions(religiousRestrictions.filter((f) => f !== food));
  };

  const validateDietForm = () => {
    const newErrors: any = {};

    const mealsNumber = Number(mealsPerDay);

    // 1. Validação do Número de Refeições
    if (!mealsPerDay) {
      newErrors.mealsPerDay = "Informe quantas refeições faz por dia";
    } else if (isNaN(mealsNumber) || mealsNumber < 1 || mealsNumber > 5) {
      newErrors.mealsPerDay = "Número de refeições inválido (1–5)";
    }

    // Validação de horários
    if (mealTimes.length < Number(mealsPerDay)) {
      newErrors.mealSchedule = `Cadastre pelo menos ${mealsPerDay} horários`;
    } else if (mealTimes.length !== mealsNumber) {
      newErrors.mealSchedule = `Você informou ${mealsNumber} refeições, mas cadastrou ${mealTimes.length} horários`;
    }

    // Validação de duplicatas (Segurança extra no Submit)
    const hasDuplicates = new Set(mealTimes).size !== mealTimes.length;
    if (hasDuplicates) {
      newErrors.mealSchedule = "Existem horários duplicados";
    }

    // Verificação de consistência: se o usuário disse que faz 3 refeições,
    // ele deve cadastrar exatamente os horários ou chegar perto disso?
    // Aqui você define se quer ser rígido:
    if (mealsNumber <= 5 && mealTimes.length !== mealsNumber) {
      newErrors.mealSchedule = `Por favor, cadastre os ${mealsNumber} horários informados acima`;
    }

    // ... (Outras validações de alimentos favoritos, etc)

    // ALIMENTOS FAVORITOS

    if (favoriteFoods.length === 0) {
      newErrors.favoriteFoods =
        "Selecione ou adicione pelo menos um alimento favorito";
    } else if (favoriteFoods.some((f) => f.trim().length === 0)) {
      newErrors.favoriteFoods =
        "Todos os alimentos devem ter pelo menos 1 caractere";
    }

    // ALIMENTOS pARA EVITAR
    if (foodsToAvoids.some((f) => f.trim().length === 0)) {
      newErrors.foodToAvoids =
        "Todos os alimentos devem ter pelo menos 1 caractere";
    }

    // religious restrictions

    if (religiousRestrictions.some((f) => f.trim().length === 0)) {
      newErrors.religiousRestrictions =
        "Todos os alimentos devem ter pelo menos 1 caractere";
    }

    // PREFERÊNCIA CULTURAL

    if (!culturalPreference) {
      newErrors.culturalPreference = "Selecione uma preferência alimentar";
    } else if (!culturalOptions.includes(culturalPreference)) {
      newErrors.culturalPreference = "Preferência alimentar inválida";
    }

    // RESTRIÇÕES RELIGIOSAS

    // if (religiousRestrictions && religiousRestrictions.trim().length < 3) {

    // newErrors.religiousRestrictions = "Digite pelo menos 3 caracteres";

    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDiet = async () => {
    if (!validateDietForm()) return;

    // Aqui você pode enviar para API ou avançar para a próxima tela

    await handleCreateDietaryRoutine(
      Number(mealsPerDay),
      favoriteFoods,
      foodsToAvoids,
      culturalPreference,
      religiousRestrictions,
      mealTimes,
      userID,
    );

    next();
    return;
  };

  const next = async () => {
    router.push({
      pathname: "/(auth)/login",
      params: { message: "Dados cadastrados com sucesso" },
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
          <Card title="Quantas refeições faz por dia? / 5 MAX">
            <Input
              icon="restaurant-outline"
              placeholder="Ex: 3"
              keyboardType="numeric"
              value={mealsPerDay}
              onChangeText={handleMealsPerDayChange}
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

          {/* ALIMENTOS POR EVITAR */}
          <Card title="Alimentos por Evitar(OPCIONAL)">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Input
                  icon="nutrition-outline"
                  placeholder="Ex: AÇUCAR"
                  value={foodsToAvoid}
                  onChangeText={setfoodsToAvoid}
                />
              </View>
              <TouchableOpacity
                onPress={addFoodToAvoid}
                className="bg-[#24B370] px-4 rounded-2xl justify-center"
              >
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.foodToAvoids && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.foodToAvoids}
              </Text>
            )}
            <View className="flex-row flex-wrap gap-2 mt-3">
              {foodsToAvoids.map((food) => (
                <Chip
                  key={food}
                  label={food}
                  onRemove={() => removeFoodToAvoid(food)}
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
          <Card title="Restrições Religiosas(OPCIONAL)">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Input
                  icon="nutrition-outline"
                  placeholder="Ex: "
                  value={religiousRestriction}
                  onChangeText={setReligiousRestriction}
                />
              </View>
              <TouchableOpacity
                onPress={addReligiousRestriction}
                className="bg-[#24B370] px-4 rounded-2xl justify-center"
              >
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            {errors.religiousRestrictions && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.religiousRestrictions}
              </Text>
            )}
            <View className="flex-row flex-wrap gap-2 mt-3">
              {religiousRestrictions.map((food) => (
                <Chip
                  key={food}
                  label={food}
                  onRemove={() => removeReligiousRestriction(food)}
                />
              ))}
            </View>
          </Card>

          <Card title="Horários habituais das refeições">
            <View className="flex-row flex-wrap gap-2 mb-3">
              {mealTimes.map((time, index) => (
                <Chip
                  key={index}
                  label={time}
                  onRemove={() =>
                    setMealTimes(mealTimes.filter((t) => t !== time))
                  }
                />
              ))}
            </View>

            {/* Só mostra o botão de adicionar se ainda não atingiu o limite */}
            {mealTimes.length < Math.min(Number(mealsPerDay), 5) && (
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="flex-row items-center justify-center border border-dashed border-[#24B370] p-3 rounded-lg"
              >
                <Icon name="add-circle-outline" size={20} color="#24B370" />
                <Text className="text-[#24B370] font-medium ml-2">
                  Adicionar Horário
                </Text>
              </TouchableOpacity>
            )}

            {showPicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
              />
            )}
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
