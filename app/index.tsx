import { Redirect } from "expo-router";

// O Expo Router vai carregar esta rota '/' primeiro.
export default function InitialRedirect() {
  // Redireciona imediatamente para a tela que você quer mostrar
  // antes de qualquer agrupamento.
  return <Redirect href="/welcome-first" />;
}
