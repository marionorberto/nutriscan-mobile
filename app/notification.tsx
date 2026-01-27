// import { API_URL } from "@/src/constants/data";
// import api from "@/src/services/api";
// import Icon from "@expo/vector-icons/Ionicons";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const filters = ["Todas", "Não lidas", "Sistema"];

// const notifications = [
//   {
//     id: 1,
//     title: "Hora da refeição",
//     description: "Registre sua refeição para manter o controle nutricional.",
//     time: "12:30",
//     date: "Hoje",
//     read: false,
//     type: "Sistema",
//     icon: "restaurant-outline",
//   },
//   {
//     id: 2,
//     title: "Lembrete de medicação",
//     description: "Hora de tomar sua medicação.",
//     time: "08:00",
//     date: "Hoje",
//     read: true,
//     type: "Sistema",
//     icon: "medkit-outline",
//   },
//   {
//     id: 3,
//     title: "Resumo diário",
//     description: "Seu resumo nutricional está pronto.",
//     time: "21:10",
//     date: "Ontem",
//     read: true,
//     type: "Sistema",
//     icon: "bar-chart-outline",
//   },
// ];

// interface INotification {
//   id: string;
//   title: string;
//   subtitle: string;
//   content: string;
//   readAt: Date;
//   status: "UNREAD" | "READ" | "IGNORED" | "DELETED";
//   category: "INFO" | "ALERTA" | "RECOMMENDED" | "PROMO" | "update";
//   emoji: string;
//   urlAction: string;
//   createdBy: "ADMIN" | "SYSTEM";
// }

// const NotificationsScreen = () => {
//   const router = useRouter();
//   const [activeFilter, setActiveFilter] = useState("Todas");
//   const [notificationsFetched, setNotificationsFetched] = useState<
//     INotification[] | null
//   >(null);
//   const [loading, setLoading] = useState(false);

//   const filteredNotifications = notifications.filter((item) => {
//     if (activeFilter === "Não lidas") return !item.read;
//     if (activeFilter === "Sistema") return item.type === "Sistema";
//     return true;
//   });

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(`${API_URL}/notifications/all`);
//       setNotificationsFetched(response.data.data);
//     } catch (error: any) {
//       Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !notificationsFetched) {
//     return (
//       <ActivityIndicator style={{ flex: 1 }} size="large" color="#24B370" />
//     );
//   }

//   if (!notificationsFetched) return null;

//   return (
//     <View className="flex-1 bg-white px-4">
//       {/* HEADER */}
//       <View className="flex-row items-center gap-4 py-4 border-b-2 border-zinc-100">
//         <Pressable
//           onPress={() => router.back()}
//           className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
//         >
//           <Icon name="chevron-back" size={22} color="#0A6B49" />
//         </Pressable>

//         <Text className="text-2xl font-bold text-primary">Notificações</Text>
//       </View>

//       {/* FILTER TABS */}
//       <View className="flex-row gap-2 px-4 mt-4">
//         {filters.map((filter) => (
//           <TouchableOpacity
//             key={filter}
//             onPress={() => setActiveFilter(filter)}
//             className={`px-4 py-2 rounded-full border ${
//               activeFilter === filter
//                 ? "bg-[#0a6b49] border-[#0a6b49]"
//                 : "bg-white border-zinc-300"
//             }`}
//           >
//             <Text
//               className={`text-sm font-medium ${
//                 activeFilter === filter ? "text-white" : "text-zinc-600"
//               }`}
//             >
//               {filter}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* LIST */}
//       <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
//         {filteredNotifications.map((item, index) => (
//           <View key={item.id}>
//             {/* DATE SEPARATOR */}
//             {(index === 0 ||
//               filteredNotifications[index - 1].date !== item.date) && (
//               <Text className="text-zinc-400 text-xs px-4 mb-2">
//                 {item.date}
//               </Text>
//             )}

//             {/* ITEM */}
//             <View className="flex-row items-start gap-4 px-4 py-4">
//               {/* DOT */}
//               {!item.read && (
//                 <View className="w-2 h-2 mt-2 rounded-full bg-[#24B370]" />
//               )}

//               {/* CONTENT */}
//               <View className="flex-1">
//                 <View className="flex-row justify-between">
//                   <Text
//                     className={`font-semibold ${
//                       item.read ? "text-zinc-800" : "text-black"
//                     }`}
//                   >
//                     {item.title}
//                   </Text>
//                   <Text className="text-xs text-zinc-400">{item.time}</Text>
//                 </View>

//                 <Text className="text-zinc-600 text-sm mt-1">
//                   {item.description}
//                 </Text>
//               </View>

//               {/* ICON */}
//               <Icon name={item.icon} size={20} color="#0a6b49" />
//             </View>

//             {/* DIVIDER */}
//             <View className="h-[1px] bg-zinc-200 ml-4" />
//           </View>
//         ))}

//         {filteredNotifications.length === 0 && (
//           <View className="items-center mt-20">
//             <Icon name="notifications-off-outline" size={42} color="#aaa" />
//             <Text className="text-zinc-500 mt-4">
//               Nenhuma notificação encontrada
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default NotificationsScreen;

import { API_URL } from "@/src/constants/data";
import api from "@/src/services/api";
import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ... (Interface INotification mantida)

interface INotification {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  readAt: Date;
  status: "UNREAD" | "READ" | "IGNORED" | "DELETED";
  category: "INFO" | "ALERTA" | "RECOMMENDED" | "PROMO" | "update";
  emoji: string;
  urlAction: string;
  createdBy: "ADMIN" | "SYSTEM";
}

const NotificationsScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [notificationsFetched, setNotificationsFetched] = useState<
    INotification[]
  >([]);
  const [loading, setLoading] = useState(true); // Começa como true para mostrar o loader inicial

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/notifications/all`);
      // O NestJS retorna os dados dentro de response.data.data
      setNotificationsFetched(response.data.data || []);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as notificações.");
    } finally {
      setLoading(false);
    }
  };

  // Filtro aplicado sobre os dados vindos da API
  const filteredNotifications = notificationsFetched.filter((item) => {
    if (activeFilter === "Não lidas") return !item.readAt;
    if (activeFilter === "Sistema") return item.createdBy === "SYSTEM";
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
      <View className="flex-row gap-2 mt-4">
        {["Todas", "Não lidas", "Sistema"].map((filter) => (
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
              className={`text-sm font-medium ${activeFilter === filter ? "text-white" : "text-zinc-600"}`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LÓGICA DE EXIBIÇÃO: LOADING OU LISTA */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#24B370" />
          <Text className="mt-4 text-zinc-500">Carregando notificações...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-6">
          {filteredNotifications.map((item, index) => (
            <View
              key={item.id}
              className="flex-row items-start gap-4 py-4 border-b border-zinc-100"
            >
              {/* DOT VERDE PARA NÃO LIDAS */}
              {!item.readAt && (
                <View className="w-2 h-2 mt-2 rounded-full bg-[#24B370]" />
              )}

              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text
                    className={`font-semibold ${item.readAt ? "text-zinc-500" : "text-black"}`}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs text-zinc-400">
                    {/* Exemplo simples de formatação de data */}
                    {new Date(item.readAt || Date.now()).toLocaleDateString(
                      "pt-BR",
                    )}
                  </Text>
                </View>
                <Text className="text-zinc-600 text-sm mt-1">
                  {item.content}
                </Text>
              </View>

              <Text style={{ fontSize: 18 }}>{item.emoji || "🔔"}</Text>
            </View>
          ))}

          {/* MENSAGEM CASO A LISTA ESTEJA VAZIA */}
          {filteredNotifications.length === 0 && (
            <View className="items-center mt-20">
              <Icon
                name="notifications-off-outline"
                size={60}
                color="#E2E8F0"
              />
              <Text className="text-zinc-500 mt-4 font-semibold text-lg">
                Nenhuma notificação
              </Text>
              <Text className="text-zinc-400 text-center px-10">
                Parece que você não tem avisos nesta categoria no momento.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationsScreen;
