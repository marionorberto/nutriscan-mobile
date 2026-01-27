import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../constants/data";

export const handleLogin = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    // 1. Verifique o que está chegando no console (ajuda muito no debug)
    // 2. Tente capturar os dados de forma flexível
    // Se o backend enviar { data: { user: { ... } } } ou { user: { ... } }
    const result = response.data.data || response.data;
    const user = result.user || result;

    if (!user) {
      throw new Error(
        "Dados do usuário não encontrados na resposta do servidor.",
      );
    }

    // 3. Salva o token (verifique se é access_token ou token no seu backend)
    await AsyncStorage.setItem("token", response.data.acess_token);

    // 4. Retorna um objeto garantido (mesmo que alguns campos falhem)
    return {
      username: user.username || "Usuário",
      img: user.img || null, // Se não tiver imagem, retorna null em vez de quebrar
      role: user.role || "paciente",
    };
  } catch (error: any) {
    throw error;
  }
};

export const handleRegister = async (
  firstname: string,
  lastname: string,
  email: string,
  img: string,
  phone: string,
  gender: string,
  address: string,
  birthday: string,
  password: string,
) => {
  const username = firstname.toLowerCase() + lastname.toLowerCase();
  email = email.toLowerCase();
  try {
    const res = await axios.post(`${API_URL}/users/create/user`, {
      firstname,
      lastname,
      username,
      email,
      img,
      phone,
      gender,
      address,
      birthday,
      password,
    });

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const handleLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem("token");
};

export const handleIsUserLoggedIn = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("token");
  return token !== null;
};
