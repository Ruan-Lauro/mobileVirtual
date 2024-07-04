import axios from "axios";
import api from "../Services/Api";

interface useAddPostResult {
  authenticationAddP: (postAdd: createPost) => Promise<string>;
}

export type createPost = {
    category: string,
    memberId: string,
    muralId: number,
    content?: string,
    media?: string[],
}

export const useAddPost = (): useAddPostResult => {

  const authenticationAddP = async (postAdd: createPost) => {
    try {
      const response = await api.post('/posts', {
        memberId: postAdd.memberId,
        muralId: postAdd.muralId,
        content: postAdd.content,
        media: postAdd.media,
        id: 1,
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

  return { authenticationAddP };
};