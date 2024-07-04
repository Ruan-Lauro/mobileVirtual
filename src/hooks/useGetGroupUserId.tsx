
import axios from "axios";
import api from "../Services/Api";
import { group } from "./useGetGroup";

interface useGetGroupUserIdResult {
  authenticationAddG: (userId: string) => Promise<group | string>;
}



export const useGetGroupUserId = (): useGetGroupUserIdResult => {

  const authenticationAddG = async (userId: string) => {
    try {
      const response = await api.get('/groups/'+userId, {
        
      });


      return response.data;
    } catch (error) {
      console.log(error)
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

  return { authenticationAddG };
};