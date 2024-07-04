import axios from "axios";
import api from "../Services/Api";
import { user } from "./useRegister";

interface useGetUsersResult {
  authenticationGetU: () => Promise<user[] | string>;
}



export const useGetUsers = (): useGetUsersResult => {
 

  const authenticationGetU = async () => {
    try {
      const response = await api.get('/users/');

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

  return { authenticationGetU };
};