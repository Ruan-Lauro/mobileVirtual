import axios from "axios";
import api from "../Services/Api";

interface useGetPostsMuralResult {
  authenticationGetPM: (muralId: number) => Promise<posts[] | string>;
}

export type posts = {
    id: string,
    category: string,
    created_at: string,
    memberId: string,
    muralId: number,
    content: string,
    media: string[],
}

export const useGetPostsMural = (): useGetPostsMuralResult => {
 


  const authenticationGetPM = async (muralId: number) => {
    try {
      const response = await api.get('/posts/mural/'+muralId);

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

  return { authenticationGetPM };
};