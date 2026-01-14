import FAIcon from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

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

        <Text className="text-2xl font-bold text-primary">Perfil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PERFIL CARD */}
        <View className="bg-soft rounded-3xl p-4 flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-4">
            <Image
              source={require("../../src/assets/images/avatar.png")}
              className="w-20 h-20 rounded-full border-2 border-white"
            />

            <View>
              <Text className="text-sm text-primary">Olá 👋</Text>
              <Text className="text-xl font-bold text-primary">
                Mário Norberto
              </Text>
              <Text className="text-sm text-gray-500">marionorberto</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center"
          >
            <FAIcon name="gear" size={22} color="#0A6B49" />
          </TouchableOpacity>
        </View>

        <SectionHeader title="Dados Pessoais" />

        <InfoItem
          icon="person-outline"
          label="Nome completo"
          value="Mário Norberto"
        />
        <InfoItem icon="at-outline" label="Username" value="marionorberto" />
        <InfoItem
          icon="mail-outline"
          label="Email"
          value="marionorberto2018@gmail.com"
        />
        <InfoItem icon="male-outline" label="Sexo" value="Masculino" />

        <SectionHeader title="Dados Médicos" />

        <InfoItem
          icon="medkit-outline"
          label="Tipo de diabetes"
          value="Tipo 2"
        />
        <InfoItem
          icon="analytics-outline"
          label="Glicemia alvo"
          value="80 – 130 mg/dL"
        />
        <InfoItem icon="fitness-outline" label="Peso" value="78 kg" />
        <InfoItem
          icon="heart-outline"
          label="Condição associada"
          value="Nenhuma"
        />
        <Pressable
          onPress={() => {
            router.push("/profileMedical");
          }}
          className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-200 "
        >
          <View className="flex-row items-center gap-3 ">
            <Icon name="pulse" size={22} color="#000" />
            <Text className="text-base font-semibold">Ver Tudo</Text>
          </View>
          <Icon name="chevron-forward-outline" size={22} color="#999" />
        </Pressable>

        <View className="h-10" />
        <TouchableHighlight
          onPress={() => {
            router.push("/(auth)/login");
          }}
          className="bg-red-100 border border-gray-200 rounded-2xl p-4 mb-4"
        >
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Icon name="log-out" size={18} color="#ef4444;" />
              <Text className="text-sm font-semibold text-gray-700">
                Log Out
              </Text>
            </View>
            <Text className="text-base text-gray-600">
              Sair da conta agora.
            </Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

/* ===================== COMPONENTES ===================== */

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row justify-between items-center mb-3 mt-4">
      <Text className="text-lg font-semibold text-primary">{title}</Text>
      <Icon name="create-outline" size={22} color="#0A6B49" />
    </View>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-2">
      <View className="flex-row items-center gap-2 mb-1">
        <Icon name={icon} size={18} color="#0A6B49" />
        <Text className="text-sm font-semibold text-gray-700">{label}</Text>
      </View>
      <Text className="text-base text-gray-600">{value}</Text>
    </View>
  );
}
