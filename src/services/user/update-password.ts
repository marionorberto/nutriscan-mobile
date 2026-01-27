import { API_URL } from "../../constants/data";
import api from "./../api";

export const handleUpdatePassword = async (
  atualPassword: string,
  newPassword: string,
): Promise<any> => {
  try {
    const response = await api.put(`${API_URL}/users/password/user/update`, {
      atualPassword,
      newPassword,
    });

    return response.data;
  } catch (error: any) {
    throw error.response.data || "Erro tentando atualizar a password!";
  }
};
