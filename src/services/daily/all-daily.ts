import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/data';

export const save = async (email: string, password: string): Promise<any> => {
  
  
  // logica para pegar todas dailys


  // try {
  //   const response = (await axios.post(`${API_URL}/auth/login`, { email, password }));
  //   console.log(response.data.userType);
  //   if (response.data.acess_token) {
  //     await AsyncStorage.setItem('token', response.data.acess_token);
  //   }

  //   return response.data;

  // } catch(error: any) {
  //   if (error.response.message) throw error.response.message;
  //   throw error.response.data || 'Erro tentando fazer login!';
  // } 
};
