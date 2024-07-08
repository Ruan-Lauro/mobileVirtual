import axios from "axios";
import api from "../Services/Api";

interface useGetGroupResult {
  authenticationG: () => Promise<group[] | string>;
}

export type group = {
  
  id: string,
  name: string,
  imgGroup: string,
  groupCode:number,
  userId: string,
  created_at: Date;
}


export const useGetGroup = (): useGetGroupResult => {
 

  const authenticationG = async () => {
    try {
      const response = await api.get('/groups');

      
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

  return { authenticationG };
};