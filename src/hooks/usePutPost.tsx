import axios from "axios";
import api from "../Services/Api";

interface useAddPostResult {
  authenticationPutP: (postAdd: putPost) => Promise<string>
}

export type putPost = {
    idPost: string,
    content?: string,
    media?: string[],
}

export const usePutPost = (): useAddPostResult => {

  const authenticationPutP = async (postAdd: putPost) => {
    try {
      const response = await api.put('/posts/'+postAdd.idPost, {
        content: postAdd.content,
        media: postAdd.media,
      });


      return response.data
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

  }

  return { authenticationPutP }
}