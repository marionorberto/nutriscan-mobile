// import Icon from "@expo/vector-icons/Entypo";
// import { useRouter } from "expo-router";
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { Image } from "expo-image";

// const WelcomeScreen = () => {
//   const router = useRouter();

//   const goToTextPage = () => {
//     router.push("/welcome-second");
//   };

//   return (
//     <View style={styles.container} className={`h-full w-full bg-white`}>
//       <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
//       <View className="-mt-48 mb-5">
//         <Image
//           contentFit="cover"
//           transition={1000}
//           source={require("../src/assets/images/welcome-first-1.svg")}
//           style={{ width: 360, height: 300 }}
//         />
//       </View>

//       <View className="mt-5 text-center">
//         <Text className="text-[#18181B] font-extrabold text-[20px] text-center">
//           O apoio que o seu dia precisa
//         </Text>
//         <Text className="text-[#999] mt-2 text-center text-xl">
//           Monitore, aprenda e cuide de si.
//         </Text>
//       </View>

//       <View className="rounded-t-[2rem] p-8 absolute bottom-0 right-0 left-0  bg-transparent">
//         <View className="flex-row justify-center gap-0">
//           <Text className="">
//             <Icon name="dot-single" size={40} color={"#24b370"} />
//           </Text>

//           <Text>
//             <Icon name="dot-single" size={40} color={"#999"} />
//           </Text>

//           <Text>
//             <Icon name="dot-single" size={40} color={"#999"} />
//           </Text>
//         </View>

//         <TouchableOpacity
//           className="px-4 py-4 mt-10 rounded-full flex gap-1 items-center bg-[#24b370] mx-8"
//           onPress={goToTextPage}
//         >
//           <Text className="text-white font-semibold text-2xl">
//             <Icon name="chevron-right" color={"#fff"} size={40} />
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
// });

import Icon from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container} className="bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* IMAGE / ILLUSTRATION */}
      <View className="mt-16 mb-8">
        <Image
          contentFit="contain"
          transition={600}
          source={require("../src/assets/images/welcome-first-1.svg")}
          style={{ width: 320, height: 260 }}
        />
      </View>

      {/* TEXT */}
      <View className="px-8">
        <Text className="text-zinc-900 font-extrabold text-2xl text-center leading-tight">
          O apoio que o seu dia precisa
        </Text>

        <Text className="text-zinc-500 mt-3 text-center text-lg leading-relaxed">
          Monitore a sua alimentação, compreenda os seus hábitos e cuide melhor
          da sua saúde todos os dias.
        </Text>
      </View>

      {/* BOTTOM AREA */}
      <View className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {/* STEPS */}
        <View className="flex-row justify-center mb-6">
          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-first");
            }}
          >
            <Icon name="dot-single" size={36} color="#24B370" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-second");
            }}
          >
            <Icon name="dot-single" size={36} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/welcome-third");
            }}
          >
            <Icon name="dot-single" size={36} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          className="flex-row justify-center items-center gap-2 py-4 rounded-full bg-[#24B370]"
          onPress={() => router.push("/welcome-second")}
          activeOpacity={0.85}
        >
          <Text className="text-white font-semibold text-xl">Continuar</Text>
          <Icon name="chevron-right" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
