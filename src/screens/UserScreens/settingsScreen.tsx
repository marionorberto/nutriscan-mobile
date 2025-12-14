import Icon from "@expo/vector-icons/Ionicons";
import Contants from "expo-constants";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Modal from "../../components/Modal";

import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const [isEnabledConsultAlert, setIsEnabledConsultAlert] = useState(true);
  const [isEnabledReminderMedication, setIsEnabledReminderMedication] =
    useState(true);
  const [isEnabledFA, setIsEnabledFA] = useState(true);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const toggleReminderMedication = () =>
    setIsEnabledReminderMedication((previousState) => !previousState);
  const toggleFA = () => setIsEnabledFA((previousState) => !previousState);
  const toggleConsultAlert = () =>
    setIsEnabledConsultAlert((previousState) => !previousState);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openTeamSupportLinks, setOpenTeamSupportLinks] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const router = useRouter();

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md bg-white border-zinc-200`}
        >
          <Pressable onPress={() => router.back()}>
            <Icon name="chevron-back-outline" size={20} color={"#000"}></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold text-black`}
        >
          Perfil
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[92%] rounded-lg p-4 mt-6 mx-auto">
          <Text className={`text-xl font-bold text-black`}>Dados de Saúde</Text>

          <Pressable
            onPress={() => {
              router.push("/(tabs)/history");
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-text-outline"
                  color={"#000"}
                  size={24}
                ></Icon>
                <Text className={`text-lg font-semibold text-black`}>
                  Histórico De Receitas
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push("/(tabs)/history")}>
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white`}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="analytics-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Exportar Relatórios
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold text-black `}>Notificações</Text>
          <View
            className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white`}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="alarm-outline" color={"#000"} size={24}></Icon>
              <Text className={`text-lg font-semibold text-black`}>
                Lembretes de Medicações
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledReminderMedication ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleReminderMedication}
                    value={isEnabledReminderMedication}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>
          <View
            className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="calendar-outline" color={"#000"} size={24}></Icon>
              <Text className={`text-lg font-semibold text-black`}>
                Alertas de Consultas
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledConsultAlert ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleConsultAlert}
                    value={isEnabledConsultAlert}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold text-black`}>Preferências</Text>
          <View
            className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white`}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="moon-outline" color={"#000"} size={24}></Icon>
              <Text className={`text-lg font-semibold  text-black`}>
                Modo Escuro/Claro
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={"#fff"}
                    ios_backgroundColor="#fff"
                    value={false}
                    onValueChange={() => {
                      alert("Modo Claro Ativado! ☀️ Modo Escuro Ativado! 🌚");
                    }}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          <View
            className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white`}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="language-outline" color={"#000"} size={24}></Icon>
              <Text className={`text-lg font-semibold  text-black`}>
                Configuração de Idioma
              </Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold text-black`}>Perfil & Conta</Text>
          <Pressable
            onPress={() => {
              router.push("/(tabs)/profile");
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="create-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold text-black`}>
                  Editar Perfil
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenModalChangePassword(true);
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white  `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="key-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold text-black`}>
                  Alterar Senha
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
            <Modal isOpen={openModalChangePassword} withInput={false}>
              <View
                className={`flex-row justify-start items-center gap-2 mt-3  w-11/12 p-6 rounded-2xl shadow-lg "bg-white  `}
              >
                <Icon name="lock-open-outline" color={"#000"} size={20}></Icon>
                <View>
                  <Text className="text-black text-lg mb-2 font-semibold dark:text-white">
                    Alterar Palavra-Passe
                  </Text>
                  <TextInput
                    placeholder="Password Atual"
                    className="py-4 px-7 bg-zinc-200/60 rounded-lg placeholder:text-zinc-400 "
                  />
                  <TextInput
                    placeholder="Password Nova"
                    className="py-4 px-4 bg-zinc-200/60 rounded-lg placeholder:text-zinc-400 mt-3 w-full"
                  />
                  <View className="flex-row justify-between mt-6">
                    <TouchableOpacity
                      onPress={() => setOpenModalChangePassword(false)}
                      className="px-5 py-3 rounded-lg bg-zinc-300 me-2"
                    >
                      <Text className="text-black font-semibold">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setOpenModalChangePassword(false)}
                      className="px-5 py-3 rounded-lg bg-blue-500"
                    >
                      <Text className="text-white font-semibold">Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </Pressable>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold  text-black `}>
            Segurança & Privacidade
          </Text>
          <View
            className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="key-outline" color={"#000"} size={24}></Icon>
              <Text className={`text-lg font-semibold  text-black`}>
                2FA Autenticação
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledFA ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleFA}
                    value={isEnabledFA}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          {/* <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="key-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
                Permissões de Acesso
              </Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View> */}
        </View>
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold  text-black `}>
            Ajuda & Suporte
          </Text>
          <Pressable
            onPress={() => {
              router.push("/(tabs)/history");
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="help-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Perguntas Frequentes
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenTeamSupportLinks(!openTeamSupportLinks);
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="accessibility-outline"
                  color={"#000"}
                  size={24}
                ></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Falar com Equipa de Suporte
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name={
                  openTeamSupportLinks
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                color={"#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
          {openTeamSupportLinks && (
            <View className="ps-4 mt-2 flex-col justify-center items-start mb-1 gap-2"></View>
          )}
          <Pressable
            onPress={() => {
              setOpenModalFeedback(true);
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="star-half-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Feedback
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
              <Modal isOpen={openModalFeedback} withInput={false}>
                <View
                  className={` w-11/12 p-6 rounded-2xl shadow-lg bg-white `}
                >
                  {/* Título */}
                  <Text
                    className={` text-xl font-semibold text-center mb-4 text-black `}
                  >
                    Deixe seu Feedback
                  </Text>

                  {/* Seção de Avaliação */}
                  <Text className={` text-sm mb-2 text-zinc-700`}>
                    Avaliação:
                  </Text>
                  <View className="flex-row justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TouchableOpacity
                        key={num}
                        onPress={() => setRating(num)}
                        className={`p-2 mx-1 rounded-full ${
                          rating >= num ? "bg-blue-500" : "bg-zinc-300"
                        }`}
                      >
                        <Text className="text-white font-semibold">{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Seção de Comentário */}
                  <Text className={` text-sm mb-2 text-zinc-700`}>
                    Comentário:
                  </Text>
                  <TextInput
                    placeholder="Digite seu comentário..."
                    className={`border border-zinc-300 rounded-lg p-3  text-sm text-black `}
                    multiline
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                  />
                  {/* Botões */}
                  <View className="flex-row justify-between mt-6">
                    <TouchableOpacity
                      onPress={() => setOpenModalFeedback(false)}
                      className="px-5 py-3 rounded-lg bg-zinc-300"
                    >
                      <Text className={` font-semibold text-black `}>
                        Cancelar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setOpenModalFeedback(false)}
                      className="px-5 py-3 rounded-lg bg-blue-500"
                    >
                      <Text className="text-white font-semibold">Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(tabs)/history");
            }}
          >
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="analytics-outline" color={"#000"} size={24}></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Sobre o App
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className={`text-xl font-bold  text-black `}>Legal</Text>
          <Pressable onPress={() => router.push("/(tabs)/history")}>
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-lock-outline"
                  color={"#000"}
                  size={24}
                ></Icon>
                <Text className={`text-lg font-semibold  text-black`}>
                  Políticas de Privacidade
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/(tabs)/history")}>
            <View
              className={`flex-row justify-between items-center  mt-2 p-4 rounded-lg "bg-white `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-attach-outline"
                  color={"#000"}
                  size={24}
                ></Icon>
                <Text className={`text-lg font-semibold  text-black `}>
                  Termos de Uso
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
