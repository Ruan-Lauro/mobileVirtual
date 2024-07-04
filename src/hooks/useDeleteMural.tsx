import axios from "axios";
import api from "../Services/Api";

interface useDeleteMuralResult {
  authenticationRM: (id: number | string) => Promise<string>
}



export const useDeleteMural = (): useDeleteMuralResult => {

  const authenticationRM = async (id: number | string) => {
    try {
      const response = await api.delete('/murals/'+id)

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

  };

  return { authenticationRM }
};