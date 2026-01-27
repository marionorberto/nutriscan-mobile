import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import { default as Icon } from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "../src/components/Modal";

interface ISettings {
  id: string;
  saveImageHistory: boolean;
  enableNutricionalAlert: boolean;
  shareDataForTraining: boolean;
  notificationEnabled: boolean;
  theme: "LIGHT" | "DARK";
}

interface IFeedback {
  id: string;
  rate: number;
  feedbackType: string;
  comment: string;
}

const SettingsScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [setting, setSetting] = useState<ISettings | null>(null);
  const [feedback, setFeedback] = useState<IFeedback | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  const [atualPassword, setAtualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  // Modais de UI
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openFeedbackUpdate, setOpenFeedbackUpdate] = useState(false);
  const [openConfirmToggle, setOpenConfirmToggle] = useState<{
    show: boolean;
    field: keyof ISettings | null;
  }>({
    show: false,
    field: null,
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const onUpdatePassword = async (atual: string, nova: string) => {
    if (!atual || !nova) {
      ToastAndroid.show("🔴Preencha todos os campos", ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true); // Se tiver um loading state
      await api.put(`${API_URL}/users/password/user/update`, {
        atualPassword: atual,
        newPassword: nova,
      });

      setOpenModalChangePassword(false);
      setAtualPassword(""); // Limpa os campos
      setNewPassword("");

      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
    } catch (error: any) {
      // 1. Captura a mensagem bruta da resposta do NestJS
      const rawMessage =
        error.response?.data?.message ||
        "🔴 Não foi possível atualizar senha, tente novamente!";

      // 2. Garante que o Toast receba sempre uma string
      // Se for array, junta os itens com uma quebra de linha ou vírgula
      const errorMsg = Array.isArray(rawMessage)
        ? rawMessage.join("\n")
        : rawMessage;

      // 3. Agora o Toast não vai mais quebrar
      ToastAndroid.show(errorMsg, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFeedback = async () => {
    // Validação básica antes de enviar
    if (rating === 0) {
      ToastAndroid.show(
        "Por favor, selecione uma nota de 1 a 5",
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      setLoading(true);

      const feedbackData = {
        rate: rating,
        comment: comment,
        feedbackType: "SUGGESTION", // Ou o valor padrão do seu Enum no NestJS
      };

      if (feedbackId) {
        // Lógica de Atualização (PATCH ou PUT)
        const response = await api.put(`${API_URL}/feedbacks/update/feedback`, {
          ...feedbackData,
          id: feedbackId,
        });
        Alert.alert("Sucesso", "Feedback atualizado!");
        setOpenFeedback(false);
      } else {
        // Lógica de Criação (POST)
        const res = await api.post(
          `${API_URL}/feedbacks/create/feedback`,
          feedbackData,
        );
        setFeedbackId(res.data.data.id); // Salva o ID recém criado
        Alert.alert("Sucesso", "Feedback enviado!");
        setOpenFeedback(false);
      }
    } catch (error: any) {
      const rawMessage =
        error.response?.data?.message || "Erro ao enviar feedback";
      const errorMsg = Array.isArray(rawMessage)
        ? rawMessage.join("\n")
        : rawMessage;

      ToastAndroid.show(errorMsg, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchSettings();
      fetchFeedback();

      return () => {
        // Opcional: código quando sai da tela
      };
    }, []),
  );

  useEffect(() => {
    fetchSettings();
    fetchFeedback();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/app-settings/setting`);
      setSetting(response.data.data);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as configurações.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/feedbacks/feedback`);

      if (response.data.data) {
        const fb = response.data.data;
        setFeedback(fb);
        setRating(fb.rate);
        setComment(fb.comment);
        setFeedbackId(fb.id); // Guardamos o ID para saber que é uma atualização
      }
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as configurações.");
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar no Backend
  const updateSetting = async (field: keyof ISettings, value: any) => {
    try {
      // Otimismo: atualiza na UI antes
      const updatedSettings = { ...setting!, [field]: value };
      setSetting(updatedSettings);

      await api.patch(`${API_URL}/setting/update`, { [field]: value });
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar alteração.");
      fetchSettings(); // Reverte o estado buscando do banco
    }
  };

  // Interceptador do Switch
  const handleToggle = (field: keyof ISettings, currentValue: boolean) => {
    // Se estiver tentando desativar algo importante, pergunta antes
    if (currentValue === true) {
      setOpenConfirmToggle({ show: true, field });
    } else {
      // Se estiver ativando, faz direto
      updateSetting(field, true);
    }
  };

  const confirmDisable = () => {
    if (openConfirmToggle.field) {
      updateSetting(openConfirmToggle.field, false);
      setOpenConfirmToggle({ show: false, field: null });
    }
  };

  const handleThemeChange = () => {
    ToastAndroid.show(
      "O Dark Mode ainda não está disponível",
      ToastAndroid.SHORT,
    );
  };

  useEffect(() => {
    fetchSettings();
    fetchFeedback();
  }, []);

  if (loading && !setting && !feedback) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#24B370" />
      </View>
    );
  }

  console.log("dados de feedback2", feedback);

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
        <Text className="text-2xl font-bold text-primary">Configurações</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!setting && (
          <TouchableOpacity
            onPress={() => {
              router.push("/registerSetting");
            }}
            className="bg-[#D9F8E5] rounded-2xl p-5"
          >
            <Text className="text-[#0a6b49] text-base font-medium leading-6">
              Se é novo no app cadastre já a sua{" "}
              <Text className="font-bold">configurações do App</Text>
            </Text>

            <View className="mt-4 flex-row items-center gap-3">
              <View className="bg-[#0a6b49] p-2 rounded-xl">
                <Icon name="chevron-forward" size={23} color="#fff" />
              </View>

              <Text className="text-[#0a6b49] font-semibold text-sm">
                click para registar agora
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {setting && (
          <>
            <Section
              title="Notificações"
              icon={true}
              onPress={() => router.push("/EditSetting")}
            >
              <SwitchRow
                icon="notifications-outline"
                label="Notificações Gerais"
                value={setting?.notificationEnabled}
                onChange={() =>
                  handleToggle(
                    "notificationEnabled",
                    setting?.notificationEnabled!,
                  )
                }
              />
              <SwitchRow
                icon="alarm-outline"
                label="Alertas Nutricionais"
                value={setting?.enableNutricionalAlert}
                onChange={() =>
                  handleToggle(
                    "enableNutricionalAlert",
                    setting?.enableNutricionalAlert!,
                  )
                }
              />
            </Section>

            <Section title="Privacidade">
              <SwitchRow
                icon="images-outline"
                label="Salvar Histórico de Imagens"
                value={setting?.saveImageHistory}
                onChange={() =>
                  handleToggle("saveImageHistory", setting?.saveImageHistory!)
                }
              />
              <SwitchRow
                icon="analytics-outline"
                label="Compartilhar dados para treino"
                value={setting?.shareDataForTraining}
                onChange={() =>
                  handleToggle(
                    "shareDataForTraining",
                    setting?.shareDataForTraining!,
                  )
                }
              />
            </Section>

            <Section title="Aparência">
              <NavRow
                icon="moon-outline"
                label="Tema do Aplicativo"
                onPress={handleThemeChange}
                rightText={setting?.theme === "LIGHT" ? "Claro" : "Escuro"}
              />
            </Section>

            <Section title="Conta">
              <NavRow
                icon="key-outline"
                label="Alterar Senha"
                onPress={() => setOpenModalChangePassword(true)}
              />
              <NavRow
                icon="star-outline"
                label="Feedback"
                onPress={() => setOpenFeedback(true)}
              />
            </Section>
          </>
        )}
      </ScrollView>

      {/* MODAL DE CONFIRMAÇÃO PARA DESATIVAR */}
      <Modal isOpen={openConfirmToggle.show} withInput={false}>
        <View className="bg-white p-6 rounded-2xl w-11/12">
          <Icon
            name="warning-outline"
            size={40}
            color="#EAB308"
            style={{ alignSelf: "center" }}
          />
          <Text className="text-lg font-bold text-center mt-2">
            Tem certeza?
          </Text>
          <Text className="text-zinc-500 text-center mb-6">
            Desativar esta opção pode limitar algumas funcionalidades do seu
            acompanhamento.
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setOpenConfirmToggle({ show: false, field: null })}
              className="flex-1 py-3 rounded-lg bg-zinc-200"
            >
              <Text className="text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmDisable}
              className="flex-1 py-3 rounded-lg bg-red-500"
            >
              <Text className="text-center font-bold text-white">
                Desativar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL ALTERAR SENHA */}
      <Modal isOpen={openModalChangePassword} withInput={true}>
        <View className={`p-6  rounded-2xl w-full max-w-md shadow-lg bg-white`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-black dark:text-white">
              Atualizar Password
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpenModalChangePassword(false);
              }}
            >
              <Icon name="close" size={24} color="#4A4A4A" />
            </TouchableOpacity>
          </View>
          <Text className={` mb-1 text-zinc-700`}>Atual Password</Text>

          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
            placeholder="Senha Atual..."
            value={atualPassword}
            onChangeText={setAtualPassword}
            secureTextEntry // ESCONDE A SENHA
          />

          <Text className={` mb-1 text-zinc-700`}>Nova Password</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
            placeholder="Nova Senha..."
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry // ESCONDE A SENHA
          />

          <TouchableOpacity
            className="bg-green-600 rounded-lg py-3 mt-2 flex-row items-center justify-center"
            onPress={() => onUpdatePassword(atualPassword, newPassword)}
          >
            <Icon name="save" size={20} color="white" className="mr-2" />
            <Text className="text-white text-center font-semibold ">
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* MODAL FEEDBACK */}
      <Modal isOpen={openFeedback} withInput={true}>
        <View className="bg-white p-6 rounded-2xl w-11/12 shadow-xl">
          <Text className="text-xl font-bold text-center mb-4 text-zinc-800">
            {feedbackId ? "Atualizar Avaliação" : "Avalie o App"}
          </Text>

          {/* SELEÇÃO DE NOTAS */}
          <View className="flex-row justify-center mb-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => setRating(n)}
                className={`mx-1 w-10 h-10 items-center justify-center rounded-full ${
                  rating >= n ? "bg-emerald-600" : "bg-zinc-200"
                }`}
              >
                <Icon
                  name={rating >= n ? "star" : "star-outline"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Conte-nos o que podemos melhorar..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="border border-zinc-200 rounded-xl p-4 h-32 text-zinc-700 bg-zinc-50"
            value={comment}
            onChangeText={setComment}
          />

          <View className="flex-row justify-end mt-6 gap-3">
            <TouchableOpacity
              onPress={() => setOpenFeedback(false)}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-zinc-100"
            >
              <Text className="font-semibold text-zinc-500">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSendFeedback} // A mesma função agora decide entre POST ou PATCH
              disabled={loading}
              className={`px-8 py-3 rounded-xl flex-row items-center justify-center ${
                loading ? "bg-emerald-300" : "bg-emerald-600"
              }`}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-bold">
                  {feedbackId ? "Atualizar" : "Enviar"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* ================= COMPONENTES AUXILIARES ATUALIZADOS ================= */
const Section = ({ title, children, icon = false, onPress }: any) => (
  <View className="mt-6">
    {/* Contêiner do Título e Ícone */}
    <View className="flex-row items-center justify-between mb-2 px-2">
      <Text className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
        {title}
      </Text>

      {/* Lógica condicional correta */}
      {icon && (
        <TouchableOpacity onPress={onPress}>
          <Icon name="create-outline" size={20} color="#0A6B49" />
        </TouchableOpacity>
      )}
    </View>

    <View className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100">
      {children}
    </View>
  </View>
);

const SwitchRow = ({ icon, label, value, onChange }: any) => (
  <View className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-100">
    <View className="flex-row items-center gap-3">
      <View className="w-8 h-8 items-center justify-center bg-white rounded-lg shadow-sm">
        <Icon name={icon} size={18} color="#0A6B49" />
      </View>
      <Text className="text-zinc-800 font-medium">{label}</Text>
    </View>
    <Switch
      value={value}
      disabled
      onValueChange={onChange}
      trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
      thumbColor={value ? "#24B370" : "#F4F4F5"}
    />
  </View>
);

const NavRow = ({ icon, label, onPress, rightText }: any) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-100 active:bg-zinc-100"
  >
    <View className="flex-row items-center gap-3">
      <View className="w-8 h-8 items-center justify-center bg-white rounded-lg shadow-sm">
        <Icon name={icon} size={18} color="#0A6B49" />
      </View>
      <Text className="text-zinc-800 font-medium">{label}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      {rightText && <Text className="text-zinc-400 text-sm">{rightText}</Text>}
      <Icon name="chevron-forward" size={18} color="#D1D5DB" />
    </View>
  </Pressable>
);

export default SettingsScreen;
