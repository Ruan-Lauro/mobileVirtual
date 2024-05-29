import api from "../Services/Api";

interface useGetGroupResult {
  authenticationG: () => Promise<group[]>;
}

export type group = {
  
  id: string,
  name: string,
  imgGroup: string,
  groupCode:number,
  userId: string,
  created_at: Date;
}


export const useGetGroup = (): useGetGroupResult => {
 

  const authenticationG = async () => {
    try {
      const response = await api.get('/groups');

      
      return response.data;
    } catch (error) {
      console.log(error)
      return 'Aconteceu um erro';
    }

  };

  return { authenticationG };
};