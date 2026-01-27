import { IProfileData } from "@/app/EditProfileInfo";
import api from "../api";

export const updateProfileInfo = async (
  profileData: IProfileData,
): Promise<any> => {
  try {
    await api.put(`/profiles/update/profile`, {
      id: profileData.id,
      phone: profileData.phone,
      gender: profileData.gender,
      birthday: profileData.birthday, // Mantenha o formato original da API (ex: "1990-05-20")
      img: profileData.img,
      address: {
        province: profileData.address.province,
        municipy: profileData.address.municipy,
        neighbourhood: profileData.address.neighbourhood,
      },
    });
    return { status: true };
  } catch (error: any) {
    const apiError =
      error.response?.data?.message || "Erro ao atualizar perfil";
    throw new Error(Array.isArray(apiError) ? apiError.join("\n") : apiError);
  }
};
