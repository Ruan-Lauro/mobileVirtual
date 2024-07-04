
import axios from "axios";
import api from "../Services/Api";

interface useAddMemberResult {
  authenticationGetM: () => Promise<member[] | string>;
}

export type member = {
    id: string,
    category: string,
    created_at: string,
    userId: string,
    groupId: string,
}

export const useGetMembers = (): useAddMemberResult => {
 


  const authenticationGetM = async () => {
    try {
      const response = await api.get('/members/');

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

  return { authenticationGetM };
};