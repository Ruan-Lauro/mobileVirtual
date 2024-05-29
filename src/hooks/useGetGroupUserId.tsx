
import api from "../Services/Api";

interface useGetGroupUserIdResult {
  authenticationAddG: (userId: string) => Promise<any>;
}



export const useGetGroupUserId = (): useGetGroupUserIdResult => {

  const authenticationAddG = async (userId: string) => {
    try {
      const response = await api.get('/groups/'+userId, {
        
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou groupUserId';
    }

  };

  return { authenticationAddG };
};