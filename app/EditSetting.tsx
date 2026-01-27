import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import Icon from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "../src/components/Modal";

interface ISettings {
  saveImageHistory: boolean;
  enableNutricionalAlert: boolean;
  shareDataForTraining: boolean;
  notificationEnabled: boolean;
  theme: "LIGHT" | "DARK";
}

const EditSettingsScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useLocalSearchParams();

  // Valores padrão baseados na sua Entity do NestJS
  const [setting, setSetting] = useState<ISettings | null>(null);

  // Estado para o Modal de confirmação
  const [openConfirmToggle, setOpenConfirmToggle] = useState<{
    show: boolean;
    field: keyof ISettings | null;
  }>({
    show: false,
    field: null,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/app-settings/setting`);
      console.log(response);
      setSetting(response.data.data);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = () => {
    ToastAndroid.show(
      "O Dark Mode ainda não está disponível",
      ToastAndroid.SHORT,
    );
  };

  const handleToggle = (field: keyof ISettings, currentValue: boolean) => {
    if (currentValue === true) {
      setOpenConfirmToggle({ show: true, field });
    } else {
      // Verificamos se prev existe para evitar erro de spread em null
      setSetting((prev) => (prev ? { ...prev, [field]: true } : null));
    }
  };

  // Função chamada dentro do Modal para confirmar a desativação
  const confirmDisable = () => {
    const fieldToDisable = openConfirmToggle.field;

    if (fieldToDisable) {
      setSetting((prev) =>
        prev ? { ...prev, [fieldToDisable]: false } : null,
      );
      setOpenConfirmToggle({ show: false, field: null });
    }
  };

  // Função para enviar ao NestJS
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Endpoint: @Post('create/setting')

      const response = await api.put(
        `${API_URL}/app-settings/update/setting`,
        setting,
      );

      if (response.status === 200) {
        Alert.alert("Sucesso", "Configurações atualizadas com sucesso!");
        router.back(); // Ou a rota que desejar após o registro
      }
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível salvar as configurações.");
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchSettings();

      return () => {
        // Opcional: código quando sai da tela
      };
    }, []),
  );

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading && !setting) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#24B370" />
        <Text className="mt-2 text-zinc-500">Carregando configurações...</Text>
      </View>
    );
  }

  // 2. PROTEÇÃO ADICIONAL: Se não houver setting, não renderiza o ScrollView
  if (!setting) return null;

  // Se o loading terminar mas o setting ainda for null (erro de API ou vazio)
  if (!setting && !loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Não foi possível carregar as configurações.</Text>
        <TouchableOpacity
          onPress={fetchSettings}
          className="mt-4 p-2 bg-emerald-500 rounded"
        >
          <Text className="text-white">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>
        <Text className="text-2xl font-bold text-primary">
          Atualize as configurações
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Section title="Notificações">
          <SwitchRow
            icon="notifications-outline"
            label="Notificações Gerais"
            value={setting.notificationEnabled}
            onChange={() =>
              handleToggle("notificationEnabled", setting.notificationEnabled)
            }
          />
          <SwitchRow
            icon="alarm-outline"
            label="Alertas Nutricionais"
            value={setting.enableNutricionalAlert}
            onChange={() =>
              handleToggle(
                "enableNutricionalAlert",
                setting.enableNutricionalAlert,
              )
            }
          />
        </Section>

        <Section title="Privacidade">
          <SwitchRow
            icon="images-outline"
            label="Salvar Histórico de Imagens"
            value={setting.saveImageHistory}
            onChange={() =>
              handleToggle("saveImageHistory", setting.saveImageHistory)
            }
          />
          <SwitchRow
            icon="analytics-outline"
            label="Compartilhar dados para treino"
            value={setting.shareDataForTraining}
            onChange={() =>
              handleToggle("shareDataForTraining", setting.shareDataForTraining)
            }
          />
        </Section>

        <Section title="Aparência">
          <NavRow
            icon="moon-outline"
            label="Tema do Aplicativo"
            onPress={handleThemeChange}
            rightText={setting.theme === "LIGHT" ? "Claro" : "Escuro"}
          />
        </Section>

        {/* CTA */}
        <View className="mt-10 pb-10">
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            className={`py-4 rounded-2xl items-center shadow-md ${loading ? "bg-emerald-300" : "bg-[#24B370]"}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-xl">
                Atualizar e Continuar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL DE CONFIRMAÇÃO */}
      <Modal isOpen={openConfirmToggle.show}>
        <View className="bg-white p-6 rounded-3xl w-11/12 shadow-2xl">
          <View className="items-center mb-4">
            <View className="bg-yellow-100 p-3 rounded-full">
              <Icon name="warning-outline" size={40} color="#EAB308" />
            </View>
          </View>
          <Text className="text-xl font-bold text-center text-zinc-900">
            Tem certeza?
          </Text>
          <Text className="text-zinc-500 text-center mt-2 mb-6">
            Desativar esta opção pode limitar o seu acompanhamento nutricional
            personalizado.
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setOpenConfirmToggle({ show: false, field: null })}
              className="flex-1 py-4 rounded-2xl bg-zinc-100"
            >
              <Text className="text-center font-bold text-zinc-600">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmDisable}
              className="flex-1 py-4 rounded-2xl bg-red-500"
            >
              <Text className="text-center font-bold text-white">
                Desativar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* ================= COMPONENTES AUXILIARES ================= */

const Section = ({ title, children }: any) => (
  <View className="mt-6">
    <Text className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 px-2">
      {title}
    </Text>
    <View className="bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100">
      {children}
    </View>
  </View>
);

const SwitchRow = ({ icon, label, value, onChange }: any) => (
  <View className="flex-row items-center justify-between px-4 py-5 border-b border-zinc-100">
    <View className="flex-row items-center gap-3">
      <View className="bg-white p-2 rounded-xl shadow-sm border border-zinc-100">
        <Icon name={icon} size={20} color="#0A6B49" />
      </View>
      <Text className="text-zinc-800 font-semibold">{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
      thumbColor={value ? "#24B370" : "#F4F4F5"}
    />
  </View>
);

const NavRow = ({ icon, label, onPress, rightText }: any) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between px-4 py-5 active:bg-zinc-100"
  >
    <View className="flex-row items-center gap-3">
      <View className="bg-white p-2 rounded-xl shadow-sm border border-zinc-100">
        <Icon name={icon} size={20} color="#0A6B49" />
      </View>
      <Text className="text-zinc-800 font-semibold">{label}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <Text className="text-zinc-400 text-sm">{rightText}</Text>
      <Icon name="chevron-forward" size={18} color="#D1D5DB" />
    </View>
  </Pressable>
);

export default EditSettingsScreen;
