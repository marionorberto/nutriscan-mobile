import { Tabs } from "expo-router";
import { Dimensions, StyleSheet, Text } from "react-native";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import Icon from "@expo/vector-icons/Feather";
import Icon2 from "@expo/vector-icons/FontAwesome";
import Icon3 from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const insets = useSafeAreaInsets();
  const bottomSafeAreaSpace = insets.bottom;
  const tabItemBottomPadding = bottomSafeAreaSpace;

  const { width } = Dimensions.get("window");

  const tabBarWidth = width - 30;
  const tabBarHeight = 60;
  const tabBarBottomMargin =
    tabItemBottomPadding > 0 ? tabItemBottomPadding : 9;
  const tabWidth = tabBarWidth / 4;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#ffffff",
        tabBarStyle: {
          height: 55,
          paddingTop: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color: "#000",
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {"Home"}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Text
                style={
                  focused && {
                    width: 50,
                    height: 30,
                    backgroundColor: "#D9F8E5",
                    borderRadius: 20,
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontWeight: "800",
                  }
                }
              >
                <Icon
                  name="home"
                  size={22}
                  color={focused ? "#0A6B40" : "#000"}
                />
              </Text>
            );
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color: "#000",
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {"Refeições"}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Text
              style={
                focused && {
                  width: 50,
                  height: 30,
                  backgroundColor: "#D9F8E5",
                  borderRadius: 20,
                  alignContent: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "800",
                }
              }
            >
              <Icon2
                name="apple"
                size={22}
                color={focused ? "#0A6B40" : "#000"}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: "health",
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color: "#000",
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {"Saúde"}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Text
              style={
                focused && {
                  width: 50,
                  height: 30,
                  backgroundColor: "#D9F8E5",
                  borderRadius: 20,
                  alignContent: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "800",
                }
              }
            >
              <Icon
                name="thermometer"
                size={22}
                color={focused ? "#0A6B40" : "#000"}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "scan",
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color: "#000",
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {"Scan"}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Text
              style={
                focused && {
                  width: 50,
                  height: 30,
                  backgroundColor: "#D9F8E5",
                  borderRadius: 20,
                  alignContent: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "800",
                }
              }
            >
              <Icon3
                name="scan-outline"
                size={22}
                color={focused ? "#0A6B40" : "#000"}
              />
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color: "#000",
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {"Perfil"}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Text
              style={
                focused && {
                  width: 50,
                  height: 30,
                  backgroundColor: "#D9F8E5",
                  borderRadius: 20,
                  alignContent: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontWeight: "800",
                }
              }
            >
              <Icon
                name="user"
                size={22}
                color={focused ? "#0A6B40" : "#000"}
              />
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
  },
  tabBarItemText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
