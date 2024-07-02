
import api from "../Services/Api";

interface useGetMuralsResult {
  authenticationGetMU: () => Promise<wall[]>;
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

export const useGetMurals = (): useGetMuralsResult => {
 


  const authenticationGetMU = async () => {
    try {
      const response = await api.get('/murals/');

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationGetMU };
};