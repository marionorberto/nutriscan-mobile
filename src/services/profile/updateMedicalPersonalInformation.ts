import api from '../api';

export const updateMedicalPersonalInformation = async (
  profileDataForUpdating: any

  ): Promise<any> => {
  try { 
    await api.put(`/profiles/update/profile`, profileDataForUpdating);

    return { status: true };

  } catch(error: any) {
    throw error.response.data || 'Ocorreu um error tentando atualizar os dados o usuário!';
  }

};

