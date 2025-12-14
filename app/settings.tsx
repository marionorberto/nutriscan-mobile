import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Modal from "../src/components/Modal";

const SettingsScreen = () => {
  const router = useRouter();

  const [mealReminder, setMealReminder] = useState(true);
  const [medicineAlert, setMedicineAlert] = useState(true);
  const [twoFA, setTwoFA] = useState(true);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
        {/* NOTIFICAÇÕES */}
        <Section title="Notificações">
          <SwitchRow
            icon="alarm-outline"
            label="Lembrete de Refeições"
            value={mealReminder}
            onChange={setMealReminder}
          />

          <SwitchRow
            icon="calendar-outline"
            label="Alertas de Remédios"
            value={medicineAlert}
            onChange={setMedicineAlert}
          />
        </Section>

        {/* PERFIL & CONTA */}
        <Section title="Perfil & Conta">
          <NavRow
            icon="create-outline"
            label="Editar Perfil"
            onPress={() => router.push("/(tabs)/profile")}
          />

          <NavRow
            icon="key-outline"
            label="Alterar Palavra-Passe"
            onPress={() => setOpenChangePassword(true)}
          />
        </Section>

        {/* SEGURANÇA */}
        <Section title="Segurança & Privacidade">
          <SwitchRow
            icon="shield-checkmark-outline"
            label="Autenticação 2FA"
            value={twoFA}
            onChange={setTwoFA}
          />
        </Section>

        {/* AJUDA */}
        <Section title="Ajuda & Suporte">
          <NavRow
            icon="star-outline"
            label="Feedback"
            onPress={() => setOpenFeedback(true)}
          />

          <NavRow
            icon="information-circle-outline"
            label="Sobre o App"
            onPress={() => {
              router.push("/about");
            }}
          />
        </Section>

        {/* LEGAL */}
        <Section title="Legal">
          <NavRow
            icon="document-lock-outline"
            label="Política de Privacidade"
            onPress={() => {
              router.push("/privacy-politics");
            }}
          />
          <NavRow
            icon="document-text-outline"
            label="Termos de Uso"
            onPress={() => {
              router.push("/use-terms");
            }}
          />
        </Section>
      </ScrollView>

      {/* MODAL ALTERAR SENHA */}
      <Modal isOpen={openChangePassword}>
        <View className="bg-white p-6 rounded-2xl w-11/12">
          <Text className="text-xl font-bold mb-4 text-black">
            Alterar Palavra-Passe
          </Text>

          <TextInput
            placeholder="Senha Atual"
            className="bg-zinc-200 rounded-lg px-4 py-3 mb-3"
          />
          <TextInput
            placeholder="Nova Senha"
            className="bg-zinc-200 rounded-lg px-4 py-3"
          />

          <View className="flex-row justify-end mt-5 gap-3">
            <TouchableOpacity
              onPress={() => setOpenChangePassword(false)}
              className="px-4 py-2 rounded-lg bg-zinc-300"
            >
              <Text className="text-black font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-lg bg-emerald-600">
              <Text className="text-white font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL FEEDBACK */}
      <Modal isOpen={openFeedback}>
        <View className="bg-white p-6 rounded-2xl w-11/12">
          <Text className="text-xl font-bold text-center mb-4">
            Avalie o App
          </Text>

          <View className="flex-row justify-center mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => setRating(n)}
                className={`mx-1 px-3 py-2 rounded-full ${
                  rating >= n ? "bg-emerald-600" : "bg-zinc-300"
                }`}
              >
                <Text className="text-white font-bold">{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Comentário..."
            multiline
            className="border border-zinc-300 rounded-lg p-3 h-24"
            value={comment}
            onChangeText={setComment}
          />

          <View className="flex-row justify-end mt-5 gap-3">
            <TouchableOpacity
              onPress={() => setOpenFeedback(false)}
              className="px-4 py-2 rounded-lg bg-zinc-300"
            >
              <Text className="font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 rounded-lg bg-emerald-600">
              <Text className="text-white font-semibold">Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;

/* ================= COMPONENTES AUXILIARES ================= */

const Section = ({ title, children }: any) => (
  <View className="px-4 mt-4">
    <Text className="text-lg font-bold text-black mb-2">{title}</Text>
    <View className="bg-white rounded-lg">{children}</View>
  </View>
);

const SwitchRow = ({ icon, label, value, onChange }: any) => (
  <View className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-200">
    <View className="flex-row items-center gap-3">
      <Icon name={icon} size={22} color="#000" />
      <Text className="text-base font-semibold">{label}</Text>
    </View>
    <SafeAreaView>
      <Switch value={value} onValueChange={onChange} thumbColor={"#24B370"} />
    </SafeAreaView>
  </View>
);

const NavRow = ({ icon, label, onPress }: any) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-200"
  >
    <View className="flex-row items-center gap-3">
      <Icon name={icon} size={22} color="#000" />
      <Text className="text-base font-semibold">{label}</Text>
    </View>
    <Icon name="chevron-forward-outline" size={22} color="#999" />
  </Pressable>
);
