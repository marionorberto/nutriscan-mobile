import { API_URL } from '../../constants/data';
import api from '../api';
import { parse, format } from 'date-fns';

export const createReport = async (
  date: string,
  ): Promise<any> => {
  try {


    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    const response = await api.post(`${API_URL}/profiles/reports`, {
      date: formattedDate,
     });

    return response.data.data;

  } catch(error: any) {
    throw error.response.data || 'Erro criar relatário!';
  }
};

