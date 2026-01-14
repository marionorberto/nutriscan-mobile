import api from '../api';

export const lastMedication = async (): Promise<any> => {
  try {
    const response = await api.get(`/medications/last`);
     
    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando /medications/last!';
  }
};



export const lastAppointment = async (): Promise<any> => {
  try {
    const response = await api.get(`/appointments/last`);
     
    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando pegar /appointments/last!';
  }
};