import axios from "axios";
import api from "../Services/Api";

interface useAddGroupResult {
  authenticationAddG: (groupAdd: createGroup) => Promise<string>;
}

export type createGroup = {
    name: string;
    userId: string;
    imgGroup: string;
}

export const useAddGroup = (): useAddGroupResult => {

  const authenticationAddG = async (groupAdd: createGroup) => {
    try {
      const response = await api.post('/groups/', {
        name: groupAdd.name,
        userId: groupAdd.userId,
        imgGroup: groupAdd.imgGroup,
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

  };

  return { authenticationAddG };
};