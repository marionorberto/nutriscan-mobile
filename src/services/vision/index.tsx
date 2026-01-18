import { API_URL } from "@/src/constants/data";
import api from "../api";

export const handleAnalyzeImage = async (imageUri: string) => {
  try {
    const formData = new FormData();

    // EXTRAÇÃO DINÂMICA:
    const filename = imageUri.split("/").pop(); // Extrai o nome do arquivo da URI
    const match = /\.(\w+)$/.exec(filename || ""); // Extrai a extensão
    const type = match ? `image/${match[1]}` : `image/jpeg`; // Define o tipo (ex: image/jpg)

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type: type,
    } as any);

    const res = await api.post(`${API_URL}/analysis/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    // Extrai a mensagem vinda do seu Backend ou usa uma genérica
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro de conexão com o servidor.";

    // Lançamos o erro para ser capturado pelo catch da função que chama
    throw new Error(errorMessage);
  }
};
