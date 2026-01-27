import { IClinicalData } from "@/app/EditClinicalInfo";
import api from "../api";

export const updateClinicalInfo = async (
  clinicalData: IClinicalData,
): Promise<any> => {
  try {
    const bmi =
      Number(clinicalData.weight) /
      Math.pow(Number(clinicalData.height) / 100, 2);

    console.log(
      bmi,
      clinicalData.weight,
      clinicalData.height,
      typeof clinicalData.weight,
    );

    // Enviamos apenas os campos necessários e garantimos os tipos
    await api.put(`/clinical-profiles/update/clinical-profile`, {
      id: clinicalData.id,
      weight: Number(clinicalData.weight),
      height: Number(clinicalData.height),
      physicalActivityLevel: clinicalData.physicalActivityLevel,
      // Geralmente o BMI é calculado no servidor, mas se precisar enviar:
      bmi,
    });

    return { status: true };
  } catch (error: any) {
    console.error("Erro ao atualizar Clinical Info:", error.response?.data);

    // 1. Tenta pegar a mensagem de erro da API
    const apiError =
      error.response?.data?.message ||
      error.response?.data ||
      "Ocorreu um erro tentando atualizar os dados clínicos!";

    // 2. Se a API retornar um array de erros (comum em validações), junta tudo numa string
    const errorMessage = Array.isArray(apiError)
      ? apiError.join("\n")
      : typeof apiError === "object"
        ? JSON.stringify(apiError)
        : apiError;

    // 3. Lança o erro para ser capturado pelo catch da Screen
    throw new Error(errorMessage);
  }
};
