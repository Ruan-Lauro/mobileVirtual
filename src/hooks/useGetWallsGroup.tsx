import axios from "axios";
import api from "../Services/Api";

interface useGetWallsGroupResult  {
    authenticationWG: (idGroup: string) => Promise<wall[] | string>;
}

export type wall = {
  id: number,
  name: string,
  imgMural: string,
  category: string,
  groupId: string,
  created_at: Date;
  isPrivate?: boolean;
}


export const useGetWallsGroup = (): useGetWallsGroupResult  => {
 

  const authenticationWG = async (idGroup: string) => {
    try {
      const response = await api.get('/murals/'+ idGroup);

      
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

  return { authenticationWG };
};