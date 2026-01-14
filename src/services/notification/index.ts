import axios from 'axios';
import { API_URL } from '../../constants/data';
import api from '../api';

export const createNotification = async (
    title: string,
    subtitle: string,
    content: string,
    img: string,
    tag: string,
  ): Promise<any> => {
  try {


    const response = await api.post(`/posts/create/post`, {
       title,
    subtitle,
    content,
    img,
    tag,
     });
     
    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando criar posts!';
  }
};


export const all = async (): Promise<any> => {
  try {
    const response = await api.get(`/posts/all`);
     
    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando pegar posts!';
  }
};
