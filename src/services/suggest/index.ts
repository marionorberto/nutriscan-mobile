import axios from 'axios';
import { API_URL } from '../../constants/data';
import api from '../api';

export const createSuggest = async (
    suggestion: string,
  ): Promise<any> => {
  try {
    const response = await api.post(`${API_URL}/profiles/suggest/video`, {
      suggestion,
     });

    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando sugestão!';
  }
};

