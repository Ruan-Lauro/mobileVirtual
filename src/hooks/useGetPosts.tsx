import axios from "axios";
import api from "../Services/Api";

interface useGetPostsResult {
  authenticationGetP: () => Promise<posts[] | string>;
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

export const useGetPosts = (): useGetPostsResult => {
 


  const authenticationGetP = async () => {
    try {
      const response = await api.get('/posts/');

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

  return { authenticationGetP };
};