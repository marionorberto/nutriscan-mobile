import { API_URL } from '../../constants/data';
import api from '../api';

export const handleSaveDaily = async ( 
      painLevel: string,
      collateralEffect: string,
      sleepWell: boolean,
      emoccioanlState: string,
      hidratedToday: boolean,
      feedToday: boolean,
      exercicesToday: boolean,
      tiredLevelToday: string,
      note: string
    ): Promise<any> => {
  try {
    const response = (await api.post(`${API_URL}/dailys/create/daily`, {
      painLevel,
      collateralEffect,
      sleepWell,
      emoccioanlState,
      hidratedToday,
      feedToday,
      exercicesToday,
      tiredLevelToday,
      note
    }));

    // console.log(response.data);
 
    return response.data;

  } catch(error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || 'Erro tentando cadastrar daily!';
  } 
};


export const lastdaily = async (): Promise<any> => {
try {
  const response = await api.get(`${API_URL}/dailys/already`);

  return response.data;

} catch(error: any) {
if (error.response.message) throw error.response.message;
throw error.response.data || 'Erro tentando pegar a ulltima daily!';
} 
};

