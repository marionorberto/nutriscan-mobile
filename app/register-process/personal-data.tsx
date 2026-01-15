import Icon from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const PersonalDataScreen = () => {
  const router = useRouter();
  const { email, password } = useLocalSearchParams();
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [img, setImg] = useState<string>();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState(new Date(2010, 11, 30));
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [municipy, setMunicipy] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    birthday?: string;
    gender?: string;
    phone?: string;
    province?: string;
    municipy?: string;
    neighbourhood?: string;
    img?: string;
  }>({});

  // Methods
  const onChangeBirthdayValue = (event: any, selectedDate?: Date) => {
    setShowDateTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const passAddressToJSON = () => {
    let addressToBePassed = {
      province: province,
      municipy: municipy,
      neighbourhood: neighbourhood,
    };

    const addressPassedToJSON = JSON.stringify(addressToBePassed);
    setAddress(addressPassedToJSON);
  };

  const validateProfileForm = () => {
    const newErrors: typeof errors = {};

    // FIRST NAME
    if (!firstname.trim()) {
      newErrors.firstname = "O primeiro nome é obrigatório";
    } else if (firstname.trim().length < 2) {
      newErrors.firstname = "Mínimo de 2 caracteres";
    }

    // LAST NAME
    if (!lastname.trim()) {
      newErrors.lastname = "O último nome é obrigatório";
    } else if (lastname.trim().length < 2) {
      newErrors.lastname = "Mínimo de 2 caracteres";
    }

    // BIRTHDAY (idade mínima: 14 anos)
    if (!birthday) {
      newErrors.birthday = "Data de nascimento obrigatória";
    } else {
      const today = new Date();
      const age =
        today.getFullYear() -
        birthday.getFullYear() -
        (today <
        new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
          ? 1
          : 0);

      if (age < 14) {
        newErrors.birthday = "Idade mínima de 14 anos";
      }
    }

    // GENDER
    if (!gender) {
      newErrors.gender = "Selecione o gênero";
    }

    // PHONE
    if (!phone) {
      newErrors.phone = "O telefone é obrigatório";
    } else if (!/^9[123457]\d{7}$/.test(phone)) {
      newErrors.phone = "Número inválido";
    }

    // PROVINCE
    if (!province) {
      newErrors.province = "Selecione a província";
    }

    // MUNICIPY
    if (!municipy) {
      newErrors.municipy = "Selecione o município";
    }

    // NEIGHBOURHOOD
    if (!neighbourhood.trim()) {
      newErrors.neighbourhood = "O bairro é obrigatório";
    } else if (neighbourhood.trim().length < 2) {
      newErrors.neighbourhood = "Mínimo de 2 caracteres";
    }

    // IMG
    if (!img) {
      newErrors.img = "A imagem é obrigatória";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = () => {
    if (!validateProfileForm()) return;

    console.log("Perfil válido, pronto para enviar à API");

    next();
  };

  const next = async () => {
    router.push({
      pathname: "/register-process/clinical-profile",
      params: {
        email,
        password,
        firstname,
        lastname,
        birthday: birthday.toISOString(),
        gender,
        phone,
        province,
        municipy,
        neighbourhood,
        img,
      },
    });
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Deve permitir que a sua aplicação acesse as images!"
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
        if (!assets) return;
        setImg(assets[0].uri);
      }
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="mb-8">
        <Text className={`text-base text-[#0A6B40] font-semibold mb-2`}>
          Passo 2 de 6
        </Text>
        <Text className="text-3xl font-extrabold text-slate-900">
          Quem é você?
        </Text>
        <Text className="text-zinc-600 mt-2 text-base leading-6">
          Essas informações ajudam a personalizar recomendações e análises
          nutricionais.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          <View className="rounded-3xl p-5 px-1">
            <Text className="text-xl font-semibold text-zinc-800 mb-4">
              Identificação
            </Text>

            <View className="gap-4">
              <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
                <Icon name="person-outline" size={20} color="#52525b" />
                <TextInput
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholder="Primeiro Nome"
                  keyboardType="default"
                  autoCapitalize="none"
                  className="flex-1 px-3 py-4 text-base text-black"
                />
              </View>
              {errors.firstname && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.firstname}
                </Text>
              )}

              <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
                <Icon name="person-outline" size={20} color="#52525b" />
                <TextInput
                  placeholder="Último Nome"
                  keyboardType="default"
                  value={lastname}
                  onChangeText={setLastname}
                  autoCapitalize="none"
                  className="flex-1 px-3 py-4 text-base text-black"
                />
              </View>
              {errors.lastname && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.lastname}
                </Text>
              )}
            </View>
          </View>

          {/* CARD – INFORMAÇÕES BÁSICAS */}
          <View className="rounded-3xl p-5 px-1">
            <Text className="text-xl font-semibold text-zinc-800 mb-4">
              Informações básicas
            </Text>

            <View className="gap-4">
              <TouchableOpacity
                onPress={() => setShowDateTimePicker(true)}
                className="flex-row justify-start items-center gap-2 bg-zinc-200/80 p-3 rounded-xl py-5"
              >
                <Icon name="calendar-outline" size={20} color="#52525b" />

                <Text className="text-center font-bold text-lg">
                  Defina a data de nascimento
                </Text>
              </TouchableOpacity>
              {showDateTimePicker && (
                <DateTimePicker
                  value={birthday}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date(1950, 0, 1)}
                  maximumDate={new Date(2010, 11, 31)}
                  onChange={onChangeBirthdayValue}
                />
              )}
              {errors.birthday && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.birthday}
                </Text>
              )}

              <Picker
                className="rounded-xl"
                style={{
                  backgroundColor: "rgb(228 228 231 / 0.8)",
                  color: "#52525b",
                }}
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Gênero" value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="feminino" value="F" />
              </Picker>
              {errors.gender && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.gender}
                </Text>
              )}

              <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
                <Icon name="call-outline" size={20} color="#52525b" />
                <Text className="text-sm font-bold p-1 bg-zinc-50 ms-1 rounded-md text-zinc-500">
                  +244
                </Text>
                <TextInput
                  placeholder="Telefone. Ex: 9xx xxx xxx"
                  keyboardType="default"
                  autoCapitalize="none"
                  className="flex-1 px-3 py-5 text-base text-black"
                  value={phone}
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
                    if (cleaned.length === 9 && /^(\d)\1{8}$/.test(cleaned))
                      return;

                    // Tudo certo, atualiza o estado
                    setPhone(cleaned);
                  }}
                />
              </View>
              {errors.phone && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.phone}
                </Text>
              )}
            </View>
          </View>

          <View className="rounded-3xl p-5 px-1">
            <Text className="text-xl font-semibold text-zinc-800 mb-4">
              Localização
            </Text>

            <View className="gap-4">
              <Picker
                className=" rounded-xl "
                style={{
                  backgroundColor: "rgb(228 228 231 / 0.8)",
                  color: "#52525b",
                }}
                selectedValue={province}
                onValueChange={(itemValue) => setProvince(itemValue)}
              >
                <Picker.Item label="Província" value="" />
                <Picker.Item label="Luanda" value="luanda" />
                <Picker.Item label="Benguela" value="benguela" />
                <Picker.Item label="Malange" value="malanje" />
                <Picker.Item label="Huíla" value="huila" />
                <Picker.Item label="Cuando" value="cuando" />
                <Picker.Item label="Uije" value="uije" />
                <Picker.Item label="Zaire" value="zaire" />
                <Picker.Item label="Bengo" value="bengo" />
                <Picker.Item label="Kwanza-Sul" value="kwanza-sul" />
                <Picker.Item label="Kwanza-Norte" value="kwanza-norte" />
                <Picker.Item label="Namibe" value="namibe" />
                <Picker.Item label="Cunene" value="cunene" />
                <Picker.Item label="Huambo" value="huambo" />
                <Picker.Item label="Bié" value="bie" />
                <Picker.Item label="Luanda-Sul" value="lunda-sul" />
                <Picker.Item label="Luanda-Norte" value="lunda-norte" />
                <Picker.Item label="Cabinda" value="cabinda" />
                <Picker.Item label="Icole-Bengo" value="icole-bengo" />
                <Picker.Item label="Cubango" value="cubango" />
                <Picker.Item label="Moxico-Leste" value="moxico-leste" />
              </Picker>
              {errors.province && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.province}
                </Text>
              )}

              <Picker
                className=" rounded-xl "
                style={{
                  backgroundColor: "rgb(228 228 231 / 0.8)",
                  color: "#52525b",
                }}
                selectedValue={municipy}
                onValueChange={(itemValue) => setMunicipy(itemValue)}
              >
                <Picker.Item label="Município" value="" />
                <Picker.Item label="Andulo" value="andulo" />
                <Picker.Item label="Benfica" value="benfica" />
                <Picker.Item label="Benguela" value="benguela" />
                <Picker.Item label="Cazenga" value="Cazengo" />
                <Picker.Item label="Catete" value="catete" />
                <Picker.Item label="Calundo" value="Calundo" />
                <Picker.Item label="Viana" value="viana" />
                <Picker.Item label="Luanda" value="luanda" />
                <Picker.Item label="Outro" value="outro" />
              </Picker>
              {errors.municipy && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.municipy}
                </Text>
              )}
              <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
                <Icon name="map-outline" size={20} color="#52525b" />
                <TextInput
                  placeholder="Bairro"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={neighbourhood}
                  onChangeText={setNeighbourhood}
                  className="flex-1 px-3 py-4 text-base text-black"
                />
              </View>

              {errors.neighbourhood && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.neighbourhood}
                </Text>
              )}
            </View>
          </View>

          <View className="mt-1">
            <Text className="text-zinc-900 font-bold mb-1">
              Carregar Foto de Perfil
            </Text>

            <View className="bg-zinc-50 w-full p-2">
              <Button title="Carregar" onPress={pickImage} />
              {errors.img && (
                <Text className="text-red-500 mt-1 text-sm">{errors.img}</Text>
              )}
              {img && (
                <View className="flex justify-center mt-2">
                  <Image
                    source={`${img}`}
                    style={{ height: 200, width: 300 }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTA FIXO */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            handleSubmitProfile();
          }}
          className="bg-[#24B370] py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-xl">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* COMPONENTE DE INPUT */
const Input = ({
  icon,
  placeholder,
  keyboardType,
}: {
  icon: any;
  placeholder: string;
  keyboardType?: any;
}) => (
  <View className="flex-row items-center bg-white rounded-2xl px-4 border border-zinc-200">
    <Icon name={icon} size={20} color="#52525b" />
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      className="flex-1 px-3 py-4 text-base text-black"
    />
  </View>
);

export default PersonalDataScreen;
