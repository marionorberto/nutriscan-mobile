import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const filters = ["Todas", "Não lidas", "Sistema"];

const notifications = [
  {
    id: 1,
    title: "Hora da refeição",
    description: "Registre sua refeição para manter o controle nutricional.",
    time: "12:30",
    date: "Hoje",
    read: false,
    type: "Sistema",
    icon: "restaurant-outline",
  },
  {
    id: 2,
    title: "Lembrete de medicação",
    description: "Hora de tomar sua medicação.",
    time: "08:00",
    date: "Hoje",
    read: true,
    type: "Sistema",
    icon: "medkit-outline",
  },
  {
    id: 3,
    title: "Resumo diário",
    description: "Seu resumo nutricional está pronto.",
    time: "21:10",
    date: "Ontem",
    read: true,
    type: "Sistema",
    icon: "bar-chart-outline",
  },
];

const NotificationsScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Não lidas") return !item.read;
    if (activeFilter === "Sistema") return item.type === "Sistema";
    return true;
  });

  return (
    <View className="flex-1 bg-white px-4">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
        >
          <Icon name="chevron-back" size={22} color="#0A6B49" />
        </Pressable>

        <Text className="text-2xl font-bold text-primary">Notificações</Text>
      </View>

      {/* FILTER TABS */}
      <View className="flex-row gap-2 px-4 mt-4">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full border ${
              activeFilter === filter
                ? "bg-[#0a6b49] border-[#0a6b49]"
                : "bg-white border-zinc-300"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeFilter === filter ? "text-white" : "text-zinc-600"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
        {filteredNotifications.map((item, index) => (
          <View key={item.id}>
            {/* DATE SEPARATOR */}
            {(index === 0 ||
              filteredNotifications[index - 1].date !== item.date) && (
              <Text className="text-zinc-400 text-xs px-4 mb-2">
                {item.date}
              </Text>
            )}

            {/* ITEM */}
            <View className="flex-row items-start gap-4 px-4 py-4">
              {/* DOT */}
              {!item.read && (
                <View className="w-2 h-2 mt-2 rounded-full bg-[#24B370]" />
              )}

              {/* CONTENT */}
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text
                    className={`font-semibold ${
                      item.read ? "text-zinc-800" : "text-black"
                    }`}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs text-zinc-400">{item.time}</Text>
                </View>

                <Text className="text-zinc-600 text-sm mt-1">
                  {item.description}
                </Text>
              </View>

              {/* ICON */}
              <Icon name={item.icon} size={20} color="#0a6b49" />
            </View>

            {/* DIVIDER */}
            <View className="h-[1px] bg-zinc-200 ml-4" />
          </View>
        ))}

        {filteredNotifications.length === 0 && (
          <View className="items-center mt-20">
            <Icon name="notifications-off-outline" size={42} color="#aaa" />
            <Text className="text-zinc-500 mt-4">
              Nenhuma notificação encontrada
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
