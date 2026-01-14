import axios from 'axios';
import { API_URL } from '../constants/data';
import api from './api';

export const handleSaveMedication = async (
    medicationName: string,
    dosage: string,
    notes: string,
    reminderTime: Date,
  ): Promise<any> => {
  try {
    const timeStringified = reminderTime.toLocaleTimeString().slice(0, 5);
    const response = await api.post(`${API_URL}/medications/create/medication`, {
      name: medicationName,
      dosage,
      note: notes,
      timeReminder: timeStringified,
     });
    return response.data;
  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar a medicação!';
  }
};


export const handleSaveSymptom= async (
    name: string,
    severity: number,
    description: string,
  ): Promise<any> => {
  try {
    const response = await api.post(`${API_URL}/symptoms/create/symptom`, {
      name,
      severity,
      description
     });
    return response.data;
  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar a sintoma!';
  }
};


export const handleSaveAppointment = async (
  nameAppointment: string,
  descriptionAppointment: string,
  dateAppointmentHour: Date,
  dateAppointment: Date,
  type: string,
  noteAppointment: string
  ): Promise<any> => {
  try {
    const [dia, mes, ano] = dateAppointment.toLocaleDateString().split('/');
    const dataHoraString = `${ano}-${mes}-${dia}T${dateAppointmentHour.toLocaleTimeString()}`; // YYYY-MM-DDTHH:mm:ss

    const dataHoraFinal = new Date(dataHoraString);
    const response = await api.post(`${API_URL}/appointments/create/appointment`, {
      name: nameAppointment,
      description: descriptionAppointment,
      dateAppointment: dataHoraFinal,
      type,
      note: noteAppointment
     });
    return response.data;
  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar consulta'
  }
};
