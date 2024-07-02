import api from "../Services/Api";

interface useGetWallsGroupResult  {
    authenticationWG: (idGroup: string) => Promise<wall[]>;
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
      console.log(error)
      return 'Aconteceu um erro';
    }

  };

  return { authenticationWG };
};