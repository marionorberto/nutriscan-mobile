import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { updateProfileInfo } from "@/src/services/profile/updateProfileInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export interface IProfileData {
  id: string;
  birthday: string;
  address: {
    municipy: string;
    neighbourhood: string;
    province: string;
  };
  phone: string;
  gender: string;
  img: string;
}

export default function EditProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [profileData, setProfileData] = useState<IProfileData | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Não definido";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Methods
  const onChangeBirthdayValue = (event: any, selectedDate?: Date) => {
    // No Android, o picker fecha sozinho após selecionar, no iOS não.
    setShowDateTimePicker(Platform.OS === "ios");

    if (selectedDate && profileData) {
      // Formata para YYYY-MM-DD
      const dateString = selectedDate.toISOString().split("T")[0];

      setProfileData({
        ...profileData,
        birthday: dateString,
      });
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/profiles/profile`);
      setProfileData(response.data.data);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Deve permitir que a sua aplicação acesse as images!",
      );
    } else {
      let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        if (!canceled && assets && profileData) {
          // Verifique se profileData não é null
          setProfileData({
            ...profileData,
            img: assets[0].uri,
          });
        }
      }
    }
  };

  const handleSubmition = async () => {
    if (!profileData) return;
    try {
      setLoading(true);
      await updateProfileInfo(profileData);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      // router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
    );
  }

  if (!profileData) return null;

  return (
    <View className="flex-1 bg-white px-4">
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>
        <Text className="text-2xl font-bold text-primary">Editar Perfil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Identificação" />
        {/* CAMPO DE IMAGEM */}
        {/* <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Foto de Perfil
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            className="w-full h-40 bg-gray-100 rounded-2xl items-center justify-center border border-dashed border-gray-300"
          >
            {profileData.img ? (
              <Image
                source={{ uri: profileData.img }}
                className="w-full h-full rounded-2xl"
              />
            ) : (
              <Text className="text-red-400">
                Toque para selecionar uma foto
              </Text>
            )}
          </TouchableOpacity>
        </View> */}

        {/* <View className="mt-1">
          <Text className="text-zinc-900 font-bold mb-1">
            Carregar Foto de Perfil
          </Text>

          <View className="bg-zinc-50 w-full p-2 mb-3">
            <Button title="Atualizar Foto" onPress={pickImage} />

            {profileData.img && (
              <View className="flex-row justify-center mt-2">
                <Image
                  source={{ uri: profileData.img }}
                  style={{ height: 170, width: 250 }}
                />
              </View>
            )}
          </View>
        </View> */}

        <View className="mt-4">
          <Text className="text-zinc-900 font-bold mb-2">Foto de Perfil</Text>

          <View className="items-center justify-center">
            <TouchableOpacity
              onPress={pickImage}
              className="bg-zinc-100 w-full h-48 rounded-3xl overflow-hidden border-2 border-dashed border-zinc-200 items-center justify-center"
            >
              {profileData.img ? (
                <Image
                  source={{ uri: profileData.img }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover" // Faz a imagem preencher o quadro sem distorcer
                />
              ) : (
                <View className="items-center">
                  <Ionicons name="camera-outline" size={40} color="#a1a1aa" />
                  <Text className=" mt-2 bg-green-400/30 text-green-500 ">
                    Toque para carregar foto
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {profileData.img && (
              <TouchableOpacity onPress={pickImage} className="mt-2 mb-4">
                <Text className="text-primary font-semibold bg-green-300/30 p-2 text-green-500 rounded-lg">
                  Alterar foto
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowDateTimePicker(true)}
          className="flex-row justify-between items-center bg-zinc-200/80 p-4 rounded-xl py-5 mb-4"
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar-outline" size={22} color="#52525b" />
            <Text className="font-bold text-gray-700">Data de Nascimento</Text>
          </View>

          {/* Aqui exibimos a data selecionada */}
          <View className="bg-white px-3 py-1 rounded-lg border border-zinc-300">
            <Text className="text-primary font-bold text-lg">
              {profileData.birthday
                ? formatDate(profileData.birthday)
                : "Selecionar"}
            </Text>
          </View>
        </TouchableOpacity>

        {showDateTimePicker && (
          <DateTimePicker
            value={
              profileData.birthday ? new Date(profileData.birthday) : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minimumDate={new Date(1930, 0, 1)}
            maximumDate={new Date()}
            onChange={onChangeBirthdayValue}
          />
        )}

        <MedicalItem
          label="Telefone"
          keyboardType="phone-pad"
          value={profileData.phone}
          onChangeText={(text) => {
            // Remove tudo que não for número
            let cleaned = text.replace(/[^0-9]/g, "");

            // Limita a 9 caracteres
            if (cleaned.length > 9) return;

            // Validações específicas
            if (cleaned.length >= 1 && cleaned[0] !== "9") return;

            if (
              cleaned.length >= 2 &&
              !["1", "2", "3", "4", "5", "7"].includes(cleaned[1])
            )
              return;

            // Evita todos os números iguais
            if (cleaned.length === 9 && /^(\d)\1{8}$/.test(cleaned)) return;

            // Tudo certo, atualiza o estado
            setProfileData({ ...profileData, phone: cleaned });
          }}
        />

        <TouchableOpacity
          onPress={() => setShowGenderPicker(!showGenderPicker)}
        >
          <MedicalItem
            label="Sexo"
            value={profileData.gender === "M" ? "Masculino" : "Feminino"}
            disabled={true}
          />
        </TouchableOpacity>

        {showGenderPicker && (
          <Picker
            selectedValue={profileData.gender}
            onValueChange={(val) => {
              setProfileData({ ...profileData, gender: val });
              if (Platform.OS === "android") setShowGenderPicker(false);
            }}
            style={{ backgroundColor: "#f4f4f5", marginBottom: 15 }}
          >
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Feminino" value="F" />
          </Picker>
        )}

        <Section title="Endereço" />

        <MedicalItem
          label="Província"
          value={profileData.address.province}
          onChangeText={(text) =>
            setProfileData({
              ...profileData,
              address: { ...profileData.address, province: text },
            })
          }
        />

        <MedicalItem
          label="Município"
          value={profileData.address.municipy}
          onChangeText={(text) =>
            setProfileData({
              ...profileData,
              address: { ...profileData.address, municipy: text },
            })
          }
        />

        <MedicalItem
          label="Bairro"
          value={profileData.address.neighbourhood}
          onChangeText={(text) =>
            setProfileData({
              ...profileData,
              address: { ...profileData.address, neighbourhood: text },
            })
          }
        />

        <View className="mt-10 pb-10">
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmition}
            className={`py-4 rounded-2xl items-center ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
          >
            <Text className="text-white font-bold text-xl">Salvar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ... (Componentes Section e MedicalItem iguais aos anteriores)
/* ===================== COMPONENTES REUTILIZADOS ===================== */

function Section({ title }: { title: string }) {
  return (
    <Text className="text-lg font-semibold text-primary mt-4 mb-2">
      {title}
    </Text>
  );
}

function MedicalItem({
  label,
  value,
  disabled = false,
  keyboardType,
  onChangeText,
}: {
  label: string;
  value: string | undefined;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <TextInput
        value={value}
        editable={!disabled}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        className={`border rounded-2xl p-4 mb-2 ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      />
    </View>
  );
}
