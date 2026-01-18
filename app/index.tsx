import { Redirect } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync(); // Impede a splash de sumir sozinha

// O Expo Router vai carregar esta rota '/' primeiro.
export default function InitialRedirect() {
  // Redireciona imediatamente para a tela que você quer mostrar
  // antes de qualquer agrupamento.
  return <Redirect href="/welcome-first" />;
}
