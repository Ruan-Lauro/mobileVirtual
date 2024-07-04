import axios, { AxiosError } from 'axios';
import api from "../Services/Api";

interface usePostEmailResult {
  authenticationPEV: (email: string,) => Promise<string>;
}

export const usePostEmailCode = (): usePostEmailResult => {

  const authenticationPEV = async (email: string) => {
    try {
      const response = await api.post('/users/emailUser/'+email);


      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "user erro"
        } else {
          return "servidor erro"
        }
      } else {
       
        console.error('Erro desconhecido:', error)
      }
      
    }

  };

  return { authenticationPEV };
};