import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/data';
import api from '../api';

export const saveTip = async (description: string, category: string): Promise<any> => {
  try {
    const response = (await api.post(`${API_URL}/tips/create/tip`, {
      description, 
      category,
    }));
   
   return response.data;

  } catch(error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || 'Erro tentando criar a Dica!';
  } 
};


export const myTips = async (): Promise<any> => {
  try {
    const response = (await api.get(`${API_URL}/tips/my-tips`));
   
   return response.data;

  } catch(error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || 'Erro tentando get a Dica!';
  } 
};
