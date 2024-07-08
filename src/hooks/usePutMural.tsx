import axios from "axios";
import api from "../Services/Api";

interface usePutMuralResult {
  authenticationPutM: (muralPut: putMural) => Promise<string>;
}

export type putMural = {
    name?: string,
    imgMural?: string,
    category?: string,
    id: number,
}

export const usePutMural = (): usePutMuralResult => {

  const authenticationPutM = async (muralPut: putMural) => {
    try {
      const response = await api.put('/murals/'+muralPut.id, {
        name: muralPut.name,
        imgMural: muralPut.imgMural,
      })


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

  return { authenticationPutM };
};