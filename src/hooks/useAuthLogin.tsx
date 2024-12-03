  import axios, { AxiosError } from 'axios';
import api from "../Services/Api";

interface UseAuthLoginResult {
  authenticationE: (email: string, password: string) => Promise<any>
}

export const useAuthLogin = (): UseAuthLoginResult => {
 


  const authenticationE = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })


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

  return { authenticationE }
};


