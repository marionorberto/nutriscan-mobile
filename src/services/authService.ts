import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/data';

export const handleLogin = async (email: string, password: string): Promise<any> => {
  try {
    const response = (await axios.post(`${API_URL}/auth/login`, { email, password }));
    if (response.data.acess_token) {
      await AsyncStorage.setItem('token', response.data.acess_token);
    }

    return response.data;

  } catch(error: any) {
    throw error;
  } 
};

export const handleRegister = async (firstname: string, lastname: string, email: string, password: string, typeUser: string) => {
  const username = firstname.toLowerCase() + lastname.toLowerCase();
  email = email.toLowerCase();
  try {
    const res = await axios.post(`${API_URL}/users/create/user`, {
      username,
      email,
      password,
      typeUser: typeUser,
    });

    return res.data;

  } catch( error: any) {
      if (error.response.message) throw error.response.message;
      throw error.response.data || 'Erro tentando fazer registrar!';
  }

}

export const handleLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem('token');
};

export const handleIsUserLoggedIn = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('token');
  return token !== null;
};

