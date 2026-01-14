import { API_URL } from '../../constants/data';
import api from '../api';

export const createQuestion = async (
    question: string,
  ): Promise<any> => {
  try {
    const response = await api.post(`${API_URL}/questions/create/question`, {
      question,
     });

    //  console.log(response);
    return response.data;


  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar o pergunta!';
  }
};


export const todasQuestions = async (): Promise<any> => {
try {
  const response = await api.get(`/questions/todas`);

  return response.data;

} catch(error: any) {
  throw error.response.data || 'Erro tentando pegar as perguntas!';
}
};

export const myQuestions = async (): Promise<any> => {
  try {
    const response = await api.get(`/questions/all`);
  
    return response.data;
  
  } catch(error: any) {
    throw error.response.data || 'Erro tentando pegar as perguntas!';
  }
  };


