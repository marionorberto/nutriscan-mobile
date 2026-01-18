import { checkEmailUser, handleRegister } from "@/src/services/authService";
import Icon from "@expo/vector-icons/Ionicons";
import CheckBox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterScreen = () => {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  }>({});

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
      repeatPassword?: string;
    } = {};

    // FISTNAME
    if (!firstname) {
      newErrors.firstname = "A Primeiro Nome é obrigatório";
    } else if (firstname.length < 3) {
      newErrors.firstname = "Mínimo de 3 caracteres";
    }

    // PASSWORD
    if (!lastname) {
      newErrors.lastname = "A último Nome é obrigatória";
    } else if (lastname.length < 3) {
      newErrors.lastname = "Mínimo de 3 caracteres";
    }

    // EMAIL
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email inválido";
    }

    // PASSWORD
    if (!password) {
      newErrors.password = "A palavra-passe é obrigatória";
    } else if (password.length < 8) {
      newErrors.password = "Mínimo de 8 caracteres";
    }

    // CONFIRM PASSWORD
    if (!repeatPassword) {
      newErrors.repeatPassword = "Confirme a palavra-passe";
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = "As palavras-passe não coincidem";
    }

    setErrors(newErrors);

    // Se não existir nenhum erro
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    let isValid = validateForm();

    const isUserRegistered: boolean = await checkEmailUser(email);

    if (isUserRegistered) {
      ToastAndroid.show(
        "🔴 Email já cadastrado. \n Entre outro email!",
        ToastAndroid.SHORT,
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const data = await handleRegister(firstname, lastname, email, password);

    next(data);
  };

  const next = async (data: any) => {
    if (!agreed) return;

    router.push({
      pathname: "/register-process/personal-data",
      params: {
        userID: data.data.id,
      },
    });
    return;
  };

  // if (loading) {
  //   return (
  //     <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
  //   );
  // }

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* HEADER / BRAND */}
      <View className="items-center mb-8">
        <Image
          source={require("../../src/assets/images/logo-bg-removed.png")}
          className="w-28 h-24 mb-4"
          resizeMode="contain"
        />

        <Text className="text-3xl font-extrabold text-slate-900 text-center">
          Criar conta
        </Text>
        <Text className="text-zinc-600 text-center mt-2 text-base">
          Regista-te para começar o controlo alimentar inteligente.
        </Text>
      </View>

      {/* FORM */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="gap-4">
          {/* USERNAME */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Primeiro Nome
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon name="person-outline" size={20} color="#52525b" />
              <TextInput
                placeholder="Primeiro Nome"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base text-black"
                value={firstname}
                onChangeText={setFirstname}
              />

              {errors.firstname && (
                <Text className="text-red-500 mt-1 text-sm">
                  {errors.firstname}
                </Text>
              )}
            </View>

            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Último Nome
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon name="person-outline" size={20} color="#52525b" />
              <TextInput
                placeholder="Último Nome"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base text-black"
                value={lastname}
                onChangeText={setLastname}
              />
            </View>
            {errors.lastname && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.lastname}
              </Text>
            )}
          </View>

          {/* EMAIL */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Email
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon name="mail-outline" size={20} color="#52525b" />
              <TextInput
                placeholder="exemplo@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base text-black"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && (
              <Text className="text-red-500 mt-1 text-sm">{errors.email}</Text>
            )}
          </View>

          {/* PASSWORD */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Palavra-passe
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon
                onPress={() => {
                  setIsVisiblePassword(!isVisiblePassword);
                }}
                name={`${isVisiblePassword ? "eye-outline" : "lock-closed-outline"}`}
                size={20}
                color="#52525b"
              />
              <TextInput
                placeholder="********"
                secureTextEntry={isVisiblePassword}
                className="flex-1 px-3 py-4 text-base text-black"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {errors.password && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.password}
              </Text>
            )}
          </View>

          {/* CONFIRM PASSWORD */}
          <View>
            <Text className="mb-2 font-semibold text-base text-zinc-700">
              Confirmar palavra-passe
            </Text>
            <View className="flex-row items-center bg-zinc-200 rounded-xl px-4">
              <Icon
                onPress={() => {
                  setIsVisibleRepeatPassword(!isVisibleRepeatPassword);
                }}
                name={`${isVisibleRepeatPassword ? "eye-outline" : "lock-closed-outline"}`}
                size={20}
                color="#52525b"
              />
              <TextInput
                placeholder="********"
                secureTextEntry={isVisibleRepeatPassword}
                className="flex-1 px-3 py-4 text-base text-black"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />
            </View>
            {errors.repeatPassword && (
              <Text className="text-red-500 mt-1 text-sm">
                {errors.repeatPassword}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-[#0a6b49] font-semibold">
                Já tenho conta!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push("/forgot-password");
              }}
            >
              <Text className="text-zinc-500 underline">Resetar a senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="py-4 flex-row justify-start items-stretch gap-2 pb-0">
        {/* <Checkbox style={styles.checkbox} value={} onValueChange={setChecked} /> */}
        <CheckBox
          value={agreed}
          onValueChange={setAgreed}
          className="pt-1 ms-2"
        />
        <Text className="text-zinc-400 pb-2 ">
          Concordo com todos os termos de uso
        </Text>
      </View>
      <Text
        onPress={() => {
          router.push("/use-terms");
        }}
        className="text-green-600 pb-2 "
      >
        Ler Termos de uso
      </Text>
      {/* CTA */}
      <View className="pb-8 pt-4">
        <TouchableOpacity
          onPress={() => {
            // router.push("/register-process/personal-data")
            handleSubmit();
          }}
          className={`${agreed ? "bg-[#24B370]" : "bg-zinc-300"}  py-4 rounded-2xl items-center shadow`}
        >
          <Text className="text-white font-bold text-xl">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
