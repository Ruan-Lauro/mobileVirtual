import api from "../Services/Api";
import { user } from "./useRegister";

interface useGetUsersResult {
  authenticationGetU: () => Promise<user[]>;
}



export const useGetUsers = (): useGetUsersResult => {
 

  const authenticationGetU = async () => {
    try {
      const response = await api.get('/users/');

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationGetU };
};