import { handleLogin } from "@/src/services/auth-service";
import Icon from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const { message } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  // Estado para capturar mensagens de erro amigáveis
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onLogin = async () => {
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const data = await handleLogin(email, password);

      // Se o handleLogin falhar silenciosamente ou retornar algo estranho
      if (!data || data.error) {
        console.log("erroru", data);
        setErrorMsg("Erro ao processar dados de login.");
        return;
      }

      console.log("err", data);

      // Agora é seguro pegar os dados
      const { username, img, role } = data;
      const userRole = role?.toLowerCase();

      if (userRole === "paciente") {
        router.push({ pathname: "/(tabs)", params: { username, img } });
      } else {
        setErrorMsg("Acesso não autorizado para este perfil.");
      }
    } catch (error: any) {
      // Tratamento de erro que você já tem...
      console.log("erroru", error.link);

      const apiMessage = error.response?.data?.message;
      setErrorMsg(
        Array.isArray(apiMessage)
          ? apiMessage[0]
          : apiMessage || "Falha no login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 pt-16"
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View className="items-center mb-10">
          <Image
            source={require("../../src/assets/images/logo-bg-removed.png")}
            className="w-28 h-24 mb-4"
            resizeMode="contain"
          />
          <Text className="text-3xl font-extrabold text-slate-900">
            Bem-vindo
          </Text>
          <Text className="text-zinc-500 text-center mt-2 text-base">
            Acesse sua conta para continuar o acompanhamento.
          </Text>
        </View>

        {/* FEEDBACK DE MENSAGENS (ERRO OU SUCESSO) */}
        <View className="mb-4">
          {message && !errorMsg && (
            <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-2 flex-row items-center gap-2">
              <Icon name="checkmark-circle" size={20} color="#059669" />
              <Text className="text-emerald-700 font-medium flex-1">
                {message}
              </Text>
            </View>
          )}

          {errorMsg && (
            <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-2 flex-row items-center gap-2">
              <Icon name="alert-circle" size={20} color="#dc2626" />
              <Text className="text-red-700 font-medium flex-1">
                {errorMsg}
              </Text>
            </View>
          )}
        </View>

        {/* FORM */}
        <View className="gap-5">
          <View>
            <Text className="mb-2 font-semibold text-zinc-700">Email</Text>
            <View className="flex-row items-center bg-zinc-100 rounded-xl px-4 border border-zinc-200 focus:border-emerald-500">
              <Icon name="mail-outline" size={20} color="#71717a" />
              <TextInput
                placeholder="exemplo@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setErrorMsg(null);
                }}
              />
            </View>
          </View>

          <View>
            <Text className="mb-2 font-semibold text-zinc-700">
              Palavra-passe
            </Text>
            <View className="flex-row items-center bg-zinc-100 rounded-xl px-4 border border-zinc-200">
              <Icon name="lock-closed-outline" size={20} color="#71717a" />
              <TextInput
                placeholder="********"
                secureTextEntry={isVisiblePassword}
                className="flex-1 px-3 py-4 text-base"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setErrorMsg(null);
                }}
              />
              <TouchableOpacity
                onPress={() => setIsVisiblePassword(!isVisiblePassword)}
              >
                <Icon
                  name={isVisiblePassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#71717a"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-[#0a6b49] font-bold">Criar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text className="text-zinc-500">Esqueci a senha</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BIOMETRIC */}
        <View className="items-center mt-10">
          <TouchableOpacity className="bg-zinc-100 p-4 rounded-full border border-zinc-200">
            <Icon name="finger-print-outline" size={32} color="#0a6b49" />
          </TouchableOpacity>
          <Text className="text-zinc-400 mt-2 text-xs uppercase tracking-widest font-bold">
            Biometria
          </Text>
        </View>

        {/* CTA */}
        <View className="mt-auto pb-10 pt-10">
          <TouchableOpacity
            disabled={loading}
            onPress={onLogin}
            className={`py-4 rounded-2xl items-center shadow-sm ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-xl">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
