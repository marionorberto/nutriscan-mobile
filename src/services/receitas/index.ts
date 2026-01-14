import { API_URL } from '../../constants/data';
import api from '../api';

export const createReceita = async (
    name: string,
    description: string,
    url: string,
  ): Promise<any> => {
  try {
    const response = await api.post(`${API_URL}/receitas/create/receita`, {
      name,
      description,
      url,
     });

    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar o receita!';
  }
};


export const allPrescriptions = async (): Promise<any> => {
try {
  const response = await api.get(`${API_URL}/receitas/all`);

  return response.data;

} catch(error: any) {
  throw error.response.data || 'Erro tentando pegar as receitas!';
}
};
