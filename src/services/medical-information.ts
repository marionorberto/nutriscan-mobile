import axios from 'axios';
import { API_URL } from '../constants/data';

export const createMedicalInformations = async (
    stage: string,
    bloodGroup: string,
    hospital: string,
    height: string,
    weight: string,
    codHospital: string,
    targetSupport: string,
  ): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/medical-informations/create/information`, {
      stage,
      bloodGroup,
      hospital,
      height: Number(height) || null,
      weight: Number(weight) || null,
      codHospital,
      targetSupport,
     });

    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar o perfil!';
  }

};

