import { IUserData } from "@/app/EditUserInfo";
import api from "../api";

export const updateUserInfo = async (userData: IUserData): Promise<any> => {
  try {
    await api.put(`/users/update/user`, {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
    });

    return { status: true };
  } catch (error: any) {
    console.log("message?", error.response.message);
    console.log("data?", error.response.data);
    // if (error.response.message) throw error.response.message;
    // throw error.response.data || "Erro tentando fazer registrar!";

    // Pega a mensagem de erro da resposta da API
    const apiError =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro desconhecido";

    // Se for um array (comum em validações), transforma em uma string legível
    const errorMessage = Array.isArray(apiError)
      ? apiError.join("\n") // Pula linha para cada erro
      : apiError;

    throw new Error(errorMessage);
  }
};
