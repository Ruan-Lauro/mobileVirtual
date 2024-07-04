
import axios from "axios";
import api from "../Services/Api";

interface useAddMemberResult {
  authenticationAddM: (userId: string, cod: string) => Promise<string>;
}

export const useAddMember = (): useAddMemberResult => {
 


  const authenticationAddM = async (userId: string, code: string) => {
    try {
      const response = await api.post('/members/'+userId, {
        userId: userId,
        code: code,
      });


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

  return { authenticationAddM };
};

