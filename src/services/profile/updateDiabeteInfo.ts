import { IDiabeteData } from "@/app/profileMedical";
import api from "../api";

export const updateDiabeteInfo = async (
  diabeteData: IDiabeteData,
): Promise<any> => {
  try {
    if (diabeteData.diagnosisYear.length > 4)
      diabeteData.diagnosisYear = diabeteData.diagnosisYear.slice(0, 4);
    await api.put(`/diabete-profiles/update/diabete-profile`, {
      id: diabeteData.id,
      diabetiType: diabeteData.diabetiType,
      currentStatus: diabeteData.currentStatus,
      diagnosisYear: diabeteData.diagnosisYear,
      lastFastingGlucose: Number(diabeteData.lastFastingGlucose),
      lastHba1c: Number(diabeteData.lastHba1c),
      hypoGlycemiaFrequency: diabeteData.hypoGlycemiaFrequency,
      hyperGlycemiaFrequency: diabeteData.hyperGlycemiaFrequency,
    });

    return { status: true };
  } catch (error: any) {
    console.log("message?", error.response.message);
    console.log("data?", error.response.data);

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
